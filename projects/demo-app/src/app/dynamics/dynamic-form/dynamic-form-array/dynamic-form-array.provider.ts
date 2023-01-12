import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Type, ValueProvider } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';
import { FormArraySchema } from '@ngxd/forms';

import { DynamicFormArrayComponentBase } from './dynamic-form-array.base';

export type FormArrayProvider<T> = NgxdProvider<
  FormArraySchema<T>,
  Type<DynamicFormArrayComponentBase<T>>
>;

export const FORM_ARRAY_PROVIDER = new InjectionToken<FormArrayProvider<unknown>[]>(
  'Form Array Provider'
);

export function provideFormArray<T>(
  type: Type<FormArraySchema<T>>,
  component: Type<DynamicFormArrayComponentBase<T>>
): ValueProvider[] {
  return [
    {
      provide: FORM_ARRAY_PROVIDER,
      useValue: { type, component } as FormArrayProvider<T>,
      multi: true,
    },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
