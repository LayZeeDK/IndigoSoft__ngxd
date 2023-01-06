import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicLazyComponent, LAZY_LOAD_MODULE } from './dynamic-lazy.component';

@NgModule({
  imports: [CommonModule, NgxdModule],
  declarations: [DynamicLazyComponent],
  exports: [DynamicLazyComponent],
})
export class DynamicLazyModule {
  static forChild(
    lazyLoadModule: () => Promise<Type<unknown>>
  ): ModuleWithProviders<DynamicLazyModule> {
    return {
      ngModule: DynamicLazyModule,
      providers: [{ provide: LAZY_LOAD_MODULE, useValue: lazyLoadModule }],
    };
  }
}
