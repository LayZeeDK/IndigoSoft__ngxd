import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';
import { FormGroupSchema } from '@ngxd/forms';

import { DynamicFormGroupComponentBase } from './dynamic-form-group.base';
import { FORM_GROUP_PROVIDER, FormGroupProvider } from './dynamic-form-group.provider';

@Injectable()
export class FormGroupComponentResolver<T> extends NgxdResolver<
  FormGroupSchema<T>,
  Type<DynamicFormGroupComponentBase<T>>
> {
  constructor(@Inject(FORM_GROUP_PROVIDER) providers: FormGroupProvider<T>[]) {
    super(providers);
  }
}
