import { Type } from '@angular/core';
import { NgxdProvider } from './provider';

export abstract class NgxdResolver<TType, TComponent extends Type<unknown>> {
  private config: Map<TType, TComponent>;

  protected constructor(providers: NgxdProvider<TType, TComponent>[]) {
    providers ??= [];
    this.config = providers.reduce(
      (config, provider) => config.set(provider.type, provider.component),
      new Map()
    );
  }

  resolve(type: TType): TComponent | null {
    if (type && type.constructor) {
      return this.config.get(type.constructor as TType) || this.config.get(type) || null;
    }

    return this.config.get(type) || null;
  }
}
