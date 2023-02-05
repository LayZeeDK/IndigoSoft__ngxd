import { Type } from '@angular/core';
import { ErrorOptions } from './error-options';
import { NgxdDemoAppError } from './ngxd-demo-app-error';

export class NgxdDemoAppNoSchemaBuilderProvidedError<
  TConstructor extends Type<unknown>
> extends NgxdDemoAppError {
  constructor(constructor: TConstructor, options?: ErrorOptions) {
    super(`No schema builder provided to resolve type "${constructor.name}"`, options);

    this.name = 'NgxdDemoAppNoSchemaBuilderProvidedError';
  }
}
