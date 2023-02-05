import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  Input,
  NgModuleFactory,
  NgModuleRef,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from '../adapter/adapter.builder';
import { NgxComponentOutletAdapterRef } from '../adapter/adapter-ref';

@Directive({ selector: '[ngxComponentOutlet]' })
export class NgxComponentOutletDirective<
  TComponent extends { [P in keyof TComponent]: TComponent[P] },
  TContext extends { [P in keyof TContext]: TContext[P] },
  TModule
> implements OnChanges, OnDestroy
{
  @Input() ngxComponentOutlet: Type<TComponent> | null = null;
  @Input() ngxComponentOutletInjector: Injector | null = null;
  @Input() ngxComponentOutletContent: Node[][] | null = null;
  @Input() ngxComponentOutletContext: TContext | null = null;
  @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<TModule> | null = null;

  @Output() ngxComponentOutletActivate = new EventEmitter<TComponent>();
  @Output() ngxComponentOutletDeactivate = new EventEmitter<TComponent>();

  private _adapterRef: NgxComponentOutletAdapterRef<TComponent> | null = null;
  private _ngModuleRef: NgModuleRef<TModule> | null = null;

  private get componentFactoryResolver(): ComponentFactoryResolver {
    return this._ngModuleRef
      ? this._ngModuleRef.componentFactoryResolver
      : this._componentFactoryResolver;
  }

  cached?: TContext;

  private get host(): TContext {
    if (this.cached) {
      return this.cached;
    }

    const { context } = this.changeDetectorRef as EmbeddedViewRef<TContext>;

    return (this.cached = context);
  }

  private get injector(): Injector {
    return this.ngxComponentOutletInjector || this.viewContainerRef.injector;
  }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private builder: NgxComponentOutletAdapterBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ngxComponentOutlet'] || changes['ngxComponentOutletInjector']) {
      if (changes['ngxComponentOutletNgModuleFactory']) {
        this.destroyNgModuleRef();
        this.createNgModuleRef();
      }

      this.destroyAdapterRef();
      this.createAdapterRef();
    }

    if (changes['ngxComponentOutletContext']) {
      this.applyContext();
    }
  }

  private applyContext() {
    if (this._adapterRef) {
      this._adapterRef.updateContext(this.ngxComponentOutletContext);
    }
  }

  ngOnDestroy() {
    this.destroyAdapterRef();
    this.destroyNgModuleRef();
  }

  private createAdapterRef() {
    if (this.ngxComponentOutlet) {
      this._adapterRef = this.builder.create(
        this.ngxComponentOutlet,
        this.viewContainerRef,
        this.injector,
        this.ngxComponentOutletContent ?? undefined,
        this.host,
        this.componentFactoryResolver
      );
      if (this.ngxComponentOutletContext) {
        this.applyContext();
      }
      this.ngxComponentOutletActivate.emit(this._adapterRef.componentRef!.instance);
    }
  }

  private destroyAdapterRef() {
    if (this._adapterRef) {
      this.ngxComponentOutletDeactivate.emit(this._adapterRef.componentRef!.instance);
      this._adapterRef.dispose();
      this._adapterRef = null;
    }
  }

  private createNgModuleRef() {
    if (this.ngxComponentOutletNgModuleFactory) {
      this._ngModuleRef = this.ngxComponentOutletNgModuleFactory.create(this.injector);
    }
  }

  private destroyNgModuleRef() {
    if (this._ngModuleRef) {
      this._ngModuleRef.destroy();
      this._ngModuleRef = null;
    }
  }
}
