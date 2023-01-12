import { InjectionToken, Provider, Type } from '@angular/core';
import { DynamicEntityObject } from '@app/dynamics';
import { SchemaBuilder } from './schema.builder';

export interface SchemaBuilderProvider<T extends DynamicEntityObject> {
  type: Type<T>;
  schemaBuilder: Type<SchemaBuilder<T>>;
}

export const SCHEMA_BUILDER_PROVIDER = new InjectionToken<
  SchemaBuilderProvider<DynamicEntityObject>[]
>('Schema Builder Provider');

export function provideSchemaBuilder<T extends DynamicEntityObject>(
  type: Type<T>,
  schemaBuilder: Type<SchemaBuilder<T>>
): Provider {
  return [
    schemaBuilder,
    {
      provide: SCHEMA_BUILDER_PROVIDER,
      useValue: { type, schemaBuilder } as SchemaBuilderProvider<T>,
      multi: true,
    },
  ];
}
