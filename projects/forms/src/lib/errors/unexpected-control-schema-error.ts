import { AbstractControlSchema } from '../forms.models';
import { getConstructor } from '../objects/get-constructor';
import { ErrorOptions } from './error-options';
import { NgxdFormsError } from './ngxd-forms-error';

export class NgxdFormsUnexpectedControlSchemaError<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> extends NgxdFormsError {
  constructor(schema: AbstractControlSchema<T, K>, options?: ErrorOptions) {
    super(`Unexpected control schema type "${getConstructor(schema).name}"`, options);

    this.name = 'NgxdFormsUnexpectedControlSchemaError';
  }
}
