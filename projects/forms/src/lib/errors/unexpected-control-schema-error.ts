import { AbstractControlSchema } from '../forms.models';
import { getConstructor } from '../objects/get-constructor';
import { ErrorOptions } from './error-options';
import { NgxdFormsError } from './ngxd-forms-error';

export class NgxdFormsUnexpectedControlSchemaError extends NgxdFormsError {
  constructor(schema: AbstractControlSchema, options?: ErrorOptions) {
    super(`Unexpected control schema type "${getConstructor(schema).name}"`, options);

    this.name = 'NgxdFormsUnexpectedControlSchemaError';
  }
}
