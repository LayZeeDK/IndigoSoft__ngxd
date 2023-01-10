import { InjectionToken, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';

import { DynamicEntityComponentBase } from './dynamic-entity.base';
import { DynamicEntityObject } from './DynamicEntityObject';

export type DynamicEntityProvider = NgxdProvider<
  DynamicEntityObject,
  Type<DynamicEntityComponentBase>
>;

export const ENTITY_PROVIDER = new InjectionToken<DynamicEntityProvider[]>('Entity Provider');
