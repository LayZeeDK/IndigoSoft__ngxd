import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';
import { FormControlSchema } from '@ngxd/forms';

import { DynamicFormControlComponentBase } from './dynamic-form-control.base';
import { FORM_CONTROL_PROVIDER, FormControlProvider } from './dynamic-form-control.provider';

@Injectable()
export class FormControlComponentResolver<T> extends NgxdResolver<
  FormControlSchema<T>,
  Type<DynamicFormControlComponentBase<T>>
> {
  constructor(@Inject(FORM_CONTROL_PROVIDER) providers: FormControlProvider<T>[]) {
    super(providers);
  }
}
