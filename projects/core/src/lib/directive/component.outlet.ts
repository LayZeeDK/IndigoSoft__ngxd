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
import { EmbeddedViewContext } from './embedded-view-context';

@Directive({ selector: '[ngxComponentOutlet]' })
export class NgxComponentOutletDirective implements OnChanges, OnDestroy {
  @Input() ngxComponentOutlet: Type<any> | null = null;
  @Input() ngxComponentOutletInjector: Injector | null = null;
  @Input() ngxComponentOutletContent: any[][] | null = null;
  @Input() ngxComponentOutletContext: any | null = null;
  @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<any> | null = null;

  @Output() ngxComponentOutletActivate = new EventEmitter<any>();
  @Output() ngxComponentOutletDeactivate = new EventEmitter<any>();

  private _adapterRef: NgxComponentOutletAdapterRef<any> | null = null;
  private _ngModuleRef: NgModuleRef<any> | null = null;

  private get componentFactoryResolver(): ComponentFactoryResolver {
    return this._ngModuleRef
      ? this._ngModuleRef.componentFactoryResolver
      : this._componentFactoryResolver;
  }

  cached?: EmbeddedViewContext;

  private get host(): EmbeddedViewContext | undefined {
    if (this.cached) {
      return this.cached;
    }

    ({ context: this.cached } = this.changeDetectorRef as EmbeddedViewRef<any>);

    return this.cached;
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
      const component = this._adapterRef.componentRef?.instance;
      if (component) {
        this.ngxComponentOutletActivate.emit(component);
      }
    }
  }

  private destroyAdapterRef() {
    if (this._adapterRef) {
      const component = this._adapterRef.componentRef?.instance;
      if (component) {
        this.ngxComponentOutletDeactivate.emit(component);
      }
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
