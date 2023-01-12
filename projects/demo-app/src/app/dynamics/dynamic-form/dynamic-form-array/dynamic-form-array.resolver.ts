import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';
import { FormArraySchema } from '@ngxd/forms';

import { DynamicFormArrayComponentBase } from './dynamic-form-array.base';
import { FORM_ARRAY_PROVIDER, FormArrayProvider } from './dynamic-form-array.provider';

@Injectable()
export class FormArrayComponentResolver<T> extends NgxdResolver<
  FormArraySchema<T>,
  Type<DynamicFormArrayComponentBase<T>>
> {
  constructor(@Inject(FORM_ARRAY_PROVIDER) providers: FormArrayProvider<T>[]) {
    super(providers);
  }
}
