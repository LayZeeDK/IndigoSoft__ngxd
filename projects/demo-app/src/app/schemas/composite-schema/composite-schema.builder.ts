import { Inject, Injectable, Injector, Type } from '@angular/core';
import { DynamicEntityObject } from '@app/dynamics';
import { SchemaBuilder } from './schema.builder';
import { SCHEMA_BUILDER_PROVIDER, SchemaBuilderProvider } from './schema-builder.provider';
import {
  AbstractControlSchema,
  FormArraySchema,
  FormControlSchema,
  FormGroupSchema,
} from '@ngxd/forms';

@Injectable()
export class SchemaBuilderResolver<T extends DynamicEntityObject> {
  private providers: Map<Type<T>, Type<SchemaBuilder<T>>>;
  private builders: Map<Type<T>, SchemaBuilder<T>> = new Map();

  constructor(
    @Inject(SCHEMA_BUILDER_PROVIDER) providers: SchemaBuilderProvider<T>[],
    private injector: Injector
  ) {
    this.providers = providers.reduce(
      (acc, provider) => acc.set(provider.type, provider.schemaBuilder),
      new Map()
    );
  }

  resolve(type: T): SchemaBuilder<T> {
    const ctor = type.constructor as Type<T>;

    if (!this.builders.has(ctor)) {
      const provider = this.providers.get(ctor)!;
      const builder = this.injector.get(provider);

      this.builders.set(ctor, builder);
    }

    return this.builders.get(ctor)!;
  }
}

@Injectable()
export class CompositeSchemaBuilder<T extends DynamicEntityObject> {
  constructor(private resolver: SchemaBuilderResolver<T>) {}

  schema(type: T): AbstractControlSchema<T> {
    return this.resolver.resolve(type).schema(type);
  }

  extract(schema: AbstractControlSchema<T>, rawValue: T | T[]): T | T[] {
    if (schema instanceof FormArraySchema) {
      return (rawValue as T[]).map((value, index) =>
        this.extract((schema as FormArraySchema<T>).controls[index], value)
      ) as T[];
    }

    if (schema instanceof FormGroupSchema) {
      const ctor = schema.$type;
      const item: T = Object.keys(rawValue as T).reduce(
        (acc, key): T => ({
          ...acc,
          [key]: this.extract(
            (schema as FormGroupSchema<T>).controls[key as keyof T],
            (rawValue as T)[key as keyof T] as T
          ),
        }),
        {} as T
      );

      return ctor !== undefined ? new ctor(item) : item;
    }

    if (schema instanceof FormControlSchema) {
      return rawValue;
    }

    return rawValue;
  }
}
