import {
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

/**
 * @experimental
 */
export class DynamicComponentFactoryResolver<TComponent extends object>
  implements ComponentFactoryResolver
{
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private host: TComponent
  ) {}

  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    return new DynamicComponentFactory(
      this.viewContainerRef,
      this.componentFactoryResolver,
      componentFactory as unknown as ComponentFactory<TComponent>,
      this.host
    ) as unknown as ComponentFactory<T>;
  }
}

/**
 * @experimental
 */
export class DynamicComponentFactory<
  TComponent extends object
> extends ComponentFactory<TComponent> {
  get componentType(): Type<TComponent> {
    return this.componentFactory.componentType;
  }

  get inputs(): { propName: string; templateName: string }[] {
    return this.componentFactory.inputs;
  }

  get ngContentSelectors(): string[] {
    return this.componentFactory.ngContentSelectors;
  }

  get outputs(): { propName: string; templateName: string }[] {
    return this.componentFactory.outputs;
  }

  get selector(): string {
    return this.componentFactory.selector;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentFactory: ComponentFactory<TComponent>,
    private host: TComponent
  ) {
    super();
  }

  create(
    injector: Injector,
    projectableNodes?: any[][],
    rootSelectorOrNode?: string | any,
    ngModule?: NgModuleRef<any>
  ): ComponentRef<TComponent> {
    const componentRef: ComponentRef<TComponent> = this.componentFactory.create(
      injector,
      projectableNodes,
      rootSelectorOrNode,
      ngModule
    );

    return new DynamicComponentRef(
      this.viewContainerRef,
      this.componentFactoryResolver,
      componentRef,
      this.host
    );
  }
}

/**
 * @experimental
 */
export class DynamicComponentRef<TComponent extends object> extends ComponentRef<TComponent> {
  get changeDetectorRef(): ChangeDetectorRef {
    return this.componentRef.changeDetectorRef;
  }

  get componentType(): Type<TComponent> {
    return this.componentRef.componentType;
  }

  get hostView(): ViewRef {
    return this.componentRef.hostView;
  }

  get injector(): Injector {
    return this.componentRef.injector;
  }

  get instance(): TComponent {
    return this.componentRef.instance;
  }

  get location(): ElementRef {
    return this.componentRef.location;
  }

  private _onDestroy: () => void = () => undefined;
  private componentAdapterRef: NgxComponentOutletAdapterRef<TComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentRef: ComponentRef<TComponent>,
    host: TComponent
  ) {
    super();

    const componentFactory: ComponentFactory<TComponent> =
      componentFactoryResolver.resolveComponentFactory(this.componentType);

    this.componentAdapterRef = new NgxComponentOutletAdapterRef(
      {
        componentFactory,
        componentRef,
        host,
      },
      viewContainerRef,
      componentFactoryResolver
    );
  }

  updateContext(context: Partial<TComponent>) {
    this.componentAdapterRef.updateContext(context);
  }

  destroy(): void {
    if (this._onDestroy) {
      this._onDestroy();
    }
    this.componentAdapterRef.dispose();
  }

  onDestroy(callback: () => void): void {
    this._onDestroy = callback;
  }

  setInput(name: string, value: unknown): void {
    this.componentRef.setInput(name, value);
  }
}

/**
 * @experimental
 */
@Injectable()
export class DynamicComponentAdapterBuilder {
  create<TComponent extends object>(
    componentType: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    injector: Injector,
    projectableNodes: any[][],
    host: TComponent,
    componentFactoryResolver: ComponentFactoryResolver
  ): DynamicComponentRef<TComponent> {
    const dynamicComponentFactoryResolver = new DynamicComponentFactoryResolver(
      viewContainerRef,
      componentFactoryResolver,
      host
    );
    const componentFactory = dynamicComponentFactoryResolver.resolveComponentFactory(componentType);

    return viewContainerRef.createComponent(
      componentFactory,
      viewContainerRef.length,
      injector,
      projectableNodes
    ) as DynamicComponentRef<TComponent>;
  }
}
