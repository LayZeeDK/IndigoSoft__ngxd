import { InjectionToken, Provider, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';
import { FormControlSchema } from '@ngxd/forms';

import { DynamicFormControlComponentBase } from './dynamic-form-control.base';

export type FormControlProvider<T> = NgxdProvider<
  FormControlSchema<T>,
  Type<DynamicFormControlComponentBase<T>>
>;

export const FORM_CONTROL_PROVIDER = new InjectionToken<FormControlProvider<unknown>[]>(
  'Form Control Provider'
);

export function provideControl<T>(
  type: Type<FormControlSchema<T>>,
  component: Type<DynamicFormControlComponentBase<T>>
): Provider {
  return [
    {
      provide: FORM_CONTROL_PROVIDER,
      useValue: { type, component } as FormControlProvider<T>,
      multi: true,
    },
  ];
}
