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
export class NgxComponentOutletDirective implements OnChanges, OnDestroy {
  @Input() ngxComponentOutlet: Type<any> | null;
  @Input() ngxComponentOutletInjector: Injector | null;
  @Input() ngxComponentOutletContent: any[][] | null;
  @Input() ngxComponentOutletContext: any | null;
  @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<any> | null;

  @Output() ngxComponentOutletActivate = new EventEmitter<any>();
  @Output() ngxComponentOutletDeactivate = new EventEmitter<any>();

  private _adapterRef: NgxComponentOutletAdapterRef<any>;
  private _ngModuleRef: NgModuleRef<any>;

  private get componentFactoryResolver(): ComponentFactoryResolver {
    return this._ngModuleRef
      ? this._ngModuleRef.componentFactoryResolver
      : this._componentFactoryResolver;
  }

  cached: any;

  private get host(): any {
    if (this.cached) {
      return this.cached;
    }

    const { context } = this.changeDetectorRef as EmbeddedViewRef<any>;

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
    if (changes.ngxComponentOutlet || changes.ngxComponentOutletInjector) {
      if (changes.ngxComponentOutletNgModuleFactory) {
        this.destroyNgModuleRef();
        this.createNgModuleRef();
      }

      this.destroyAdapterRef();
      this.createAdapterRef();
    }

    if (changes.ngxComponentOutletContext) {
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
        this.ngxComponentOutletContent,
        this.host,
        this.componentFactoryResolver
      );
      if (this.ngxComponentOutletContext) {
        this.applyContext();
      }
      this.ngxComponentOutletActivate.emit(this._adapterRef.componentRef.instance);
    }
  }

  private destroyAdapterRef() {
    if (this._adapterRef) {
      this.ngxComponentOutletDeactivate.emit(this._adapterRef.componentRef.instance);
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
