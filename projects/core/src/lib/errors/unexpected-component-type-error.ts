import { Type } from '@angular/core';
import { ErrorOptions } from './error-options';
import { NgxdError } from './ngxd-error';

export class NgxdUnexpectedComponentTypeError<T> extends NgxdError {
  constructor(nonComponentType: Type<T>, options?: ErrorOptions) {
    super(`Type "${nonComponentType.name}" is not a component class.`, options);

    this.name = 'NgxdUnexpectedComponentTypeError';
  }
}
