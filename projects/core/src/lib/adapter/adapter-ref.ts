import {
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  isDevMode,
  SimpleChange,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { BindingDef, Disposable, PRIVATE_PREFIX, PropertyDef, toPropertyDef } from '../utils';
import { HostAdapter } from './host.adapter';
import { attachLifecycle } from './lifecycle.strategies';

export interface NgxComponentOutletAdapterRefConfig<TContext> {
  componentFactory: ComponentFactory<TContext>;
  componentRef: ComponentRef<TContext>;
  host: TContext;
}

export class NgxComponentOutletAdapterRef<TContext> {
  componentFactory: ComponentFactory<TContext>;
  componentRef: ComponentRef<TContext>;
  host: TContext;
  context: TContext = {} as TContext;

  private changeDetectorRef: ChangeDetectorRef;
  private attachedInputs: Subscription[] = [];
  private attachedOutputs: Subscription[] = [];
  private propertyDefs: PropertyDef<TContext>[] = [];
  private bindingDefs: BindingDef<TContext>[] = [];

  private hostAdapter: HostAdapter<TContext>;
  private detachLifecycle?: Disposable;

  constructor(
    config: NgxComponentOutletAdapterRefConfig<TContext>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.componentFactory = config.componentFactory;
    this.componentRef = config.componentRef;
    this.host = config.host;
    this.changeDetectorRef = this.componentRef.injector.get<ChangeDetectorRef>(
      ChangeDetectorRef as Type<ChangeDetectorRef>,
      this.componentRef.changeDetectorRef
    );
    this.propertyDefs = this.componentFactory.inputs.map(
      toPropertyDef(this.context, this.componentRef.instance, this.host)
    );

    this.hostAdapter = new HostAdapter<TContext>(this.host);
    this.hostAdapter.attach();
    this.attachInputs();
    this.attachLifecycle();
    this.attachOutputs();
  }

  dispose(): void {
    this.disposeOutputs();
    this.disposeInputs();
    this.detachHost();

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null as unknown as ComponentRef<TContext>;
    }

    if (this.detachLifecycle) {
      this.detachLifecycle();
      this.detachLifecycle = null as unknown as Disposable;
    }
  }

  updateContext(context: Partial<TContext>): void {
    const contextProps: (string & keyof TContext)[] = context
      ? (Object.keys(context) as (string & keyof TContext)[])
      : [];
    for (const contextPropName of contextProps) {
      const bindingDef = this.getBindingDef(contextPropName);
      if (bindingDef) {
        this.detachHostInput(bindingDef);
      }

      const propertyDef = this.getPropertyDef(contextPropName);
      if (propertyDef && this.context[propertyDef.outsidePropName] !== context[contextPropName]) {
        this.context[propertyDef.outsidePropName] = context[contextPropName] as TContext[string &
          keyof TContext];
      }
    }

    const unattachedProps = this.propertyDefs.filter(
      (propertyDef) =>
        !(
          contextProps.indexOf(propertyDef.outsidePropName) > -1 ||
          this.getBindingDef(propertyDef.outsidePropName)
        )
    );
    for (const propertyDef of unattachedProps) {
      const bindingDef: BindingDef<TContext> = this.attachHostInput(propertyDef);
      this.attachInput(bindingDef);
    }
  }

  private getPropertyDef(outsidePropName: keyof TContext): PropertyDef<TContext> | undefined {
    return this.propertyDefs.find((_) => _.outsidePropName === outsidePropName);
  }

  private getBindingDef(outsidePropName: keyof TContext): BindingDef<TContext> | undefined {
    return this.bindingDefs.find((_) => _.outsidePropName === outsidePropName);
  }

  private detachHost(): void {
    this.hostAdapter.detach();
    this.hostAdapter = null as unknown as HostAdapter<TContext>;
  }

  private attachHostInput(propertyDef: PropertyDef<TContext>): BindingDef<TContext> {
    const bindingDef: BindingDef<TContext> = this.hostAdapter.attachInput(propertyDef);
    this.bindingDefs.push(bindingDef);
    return bindingDef;
  }

  private detachHostInput(bindingDef: BindingDef<TContext>): void {
    this.hostAdapter.detachInput(bindingDef);
    this.bindingDefs = this.bindingDefs.filter((_) => _ !== bindingDef);
  }

  private attachInputs(): void {
    this.bindingDefs = [];
    for (const propertyDef of this.propertyDefs) {
      const bindingDef: BindingDef<TContext> = this.attachHostInput(propertyDef);
      this.attachContextPropertyToComponentInput(bindingDef);
      this.attachInput(bindingDef);
    }
  }

  private attachInput(bindingDef: BindingDef<TContext>) {
    const host = this.host;
    const hostAdapter = this.hostAdapter;
    const context: Partial<TContext> = this.context;
    const defaultValue = host[bindingDef.outsidePropName];

    if (typeof defaultValue !== 'undefined') {
      context[bindingDef.outsidePropName] = defaultValue;
    }

    const subscription = hostAdapter.getInputAdapter(bindingDef).changes.subscribe((value) => {
      context[bindingDef.outsidePropName] = value as TContext[string & keyof TContext];
    });

    this.attachedInputs.push(subscription);
  }

  private attachContextPropertyToComponentInput(bindingDef: BindingDef<TContext>): void {
    const { insidePropName, outsidePropName, defaultDescriptor } = bindingDef;
    Object.defineProperty(bindingDef.context, outsidePropName, {
      get: (): TContext[string & keyof TContext] | undefined => {
        if (defaultDescriptor && defaultDescriptor.get) {
          return defaultDescriptor.get.call(bindingDef.context);
        } else {
          return bindingDef.dynamicContext[insidePropName];
        }
      },
      set: (value: TContext[string & keyof TContext] | undefined): void => {
        if (bindingDef.dynamicContext[insidePropName] === value) {
          return void 0;
        }

        const dynamicContext = bindingDef.dynamicContext as TContext & {
          [PRIVATE_PREFIX]?: SimpleChanges;
        };

        let simpleChanges: SimpleChanges | undefined = dynamicContext[PRIVATE_PREFIX];

        if (simpleChanges == null) {
          simpleChanges = dynamicContext[PRIVATE_PREFIX] = {};
        }

        const isFirstChange =
          !bindingDef.dynamicContext[`${PRIVATE_PREFIX}_${outsidePropName}` as keyof TContext];
        bindingDef.dynamicContext[`${PRIVATE_PREFIX}_${outsidePropName}` as keyof TContext] =
          true as unknown as TContext[keyof TContext];

        simpleChanges[outsidePropName] = new SimpleChange(
          bindingDef.dynamicContext[insidePropName],
          value,
          isFirstChange
        );

        if (defaultDescriptor && defaultDescriptor.set) {
          defaultDescriptor.set.call(bindingDef.hostContext, value);
        }

        try {
          bindingDef.dynamicContext[insidePropName] = value as TContext[string & keyof TContext];
        } catch (e) {
          // Todo: add more debug
          if (isDevMode()) {
            const constructorName = (bindingDef.dynamicContext as object).constructor.name;
            console.log(`You should use get and set descriptors both with dynamic components:
ERROR: not found '${insidePropName}' input, it has getter only, please add setter!

  class ${constructorName} {

    get ${insidePropName}() { ... }

    // Please add that 👇
    set ${insidePropName}() { ... }

  }`);
            console.error(e);
          }
        }
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  private attachLifecycle(): void {
    this.detachLifecycle = attachLifecycle(
      this.componentRef,
      this.viewContainerRef,
      this.componentFactoryResolver
    );
  }

  private disposeInputs(): void {
    for (const bindingDef of this.bindingDefs) {
      this.detachHostInput(bindingDef);
    }

    for (const subscription of this.attachedInputs) {
      subscription.unsubscribe();
    }

    this.attachedInputs.splice(0);
  }

  private attachOutputs(): void {
    const propertyDefs = this.componentFactory.outputs.map(
      toPropertyDef(this.context, this.componentRef.instance, this.host)
    );
    for (const propertyDef of propertyDefs) {
      if (propertyDef.outsidePropName in this.host) {
        const subscription = (
          this.componentRef.instance[propertyDef.insidePropName] as unknown as Observable<unknown>
        ).subscribe(this.host[propertyDef.outsidePropName] as unknown as PartialObserver<unknown>);
        this.attachedOutputs.push(subscription);
      }
    }
  }

  private disposeOutputs(): void {
    for (const subscription of this.attachedOutputs) {
      subscription.unsubscribe();
    }
    this.attachedOutputs.splice(0);
  }
}
