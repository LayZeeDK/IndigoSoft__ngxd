import { NgModule, Provider, Type } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicEntityComponentBase } from './dynamic-entity.base';
import { DynamicEntityComponent } from './dynamic-entity.component';
import { DynamicEntityProvider, ENTITY_PROVIDER } from './dynamic-entity.provider';
import { EntityComponentResolver } from './dynamic-entity.resolver';
import { DynamicEntityObject } from './DynamicEntityObject';

@NgModule({
  imports: [NgxdModule],
  declarations: [DynamicEntityComponent],
  exports: [DynamicEntityComponent],
  providers: [EntityComponentResolver],
})
export class DynamicEntityModule {
  static provide(
    type: Type<DynamicEntityObject>,
    component: Type<DynamicEntityComponentBase>
  ): Provider[] {
    return [
      {
        provide: ENTITY_PROVIDER,
        useValue: { type, component } as DynamicEntityProvider,
        multi: true,
      },
    ];
  }
}
