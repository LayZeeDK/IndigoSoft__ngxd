import { Injectable, Injector, NgModuleRef, Type, ViewContainerRef } from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

/**
 * @deprecated
 */
@Injectable()
export class NgxComponentOutletAdapterBuilder {
  create<TComponent, TModule>(
    componentType: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    injector: Injector,
    projectableNodes: Node[][] | undefined = undefined,
    host: TComponent,
    ngModuleRef?: NgModuleRef<TModule>
  ): NgxComponentOutletAdapterRef<TComponent> {
    const componentRef = viewContainerRef.createComponent(componentType, {
      injector,
      projectableNodes,
      ngModuleRef,
      index: viewContainerRef.length,
    });

    const adapterRef = new NgxComponentOutletAdapterRef(
      {
        componentRef,
        componentType,
        host,
      },
      viewContainerRef
    );

    return adapterRef;
  }
}
