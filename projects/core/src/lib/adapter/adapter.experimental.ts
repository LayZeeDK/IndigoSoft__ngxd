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
export class DynamicComponentFactoryResolver<TComponent> implements ComponentFactoryResolver {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private host: TComponent
  ) {}

  resolveComponentFactory<T>(component: Type<T>): DynamicComponentFactory<T> {
    const componentFactory: ComponentFactory<T> =
      this.componentFactoryResolver.resolveComponentFactory(component);

    return new DynamicComponentFactory(
      this.viewContainerRef,
      this.componentFactoryResolver,
      componentFactory,
      this.host as unknown as T
    );
  }
}

/**
 * @experimental
 */
export class DynamicComponentFactory<T> implements ComponentFactory<T> {
  get componentType(): Type<T> {
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
    private componentFactory: ComponentFactory<T>,
    private host: T
  ) {}

  create(
    injector: Injector,
    projectableNodes?: Node[][],
    rootSelectorOrNode?: string | Node,
    ngModule?: NgModuleRef<unknown>
  ): ComponentRef<T> {
    const componentRef: ComponentRef<T> = this.componentFactory.create(
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
export class DynamicComponentRef<T> implements ComponentRef<T> {
  get changeDetectorRef(): ChangeDetectorRef {
    return this.componentRef.changeDetectorRef;
  }

  get componentType(): Type<T> {
    return this.componentRef.componentType;
  }

  get hostView(): ViewRef {
    return this.componentRef.hostView;
  }

  get injector(): Injector {
    return this.componentRef.injector;
  }

  get instance(): T {
    return this.componentRef.instance;
  }

  get location(): ElementRef {
    return this.componentRef.location;
  }

  private _onDestroy: () => void = () => undefined;
  private componentAdapterRef: NgxComponentOutletAdapterRef<T>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentRef: ComponentRef<T>,
    host: T
  ) {
    const componentFactory: ComponentFactory<T> = componentFactoryResolver.resolveComponentFactory(
      this.componentType
    );

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

  updateContext(context: T) {
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
  create<TComponent>(
    componentType: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    injector: Injector,
    projectableNodes: Node[][],
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
