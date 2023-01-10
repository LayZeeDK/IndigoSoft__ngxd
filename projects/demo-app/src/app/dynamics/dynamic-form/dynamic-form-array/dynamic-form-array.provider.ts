import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Type, ValueProvider } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';
import { FormArraySchema } from '@ngxd/forms';

import { DynamicFormArrayComponentBase } from './dynamic-form-array.base';

export type FormArrayProvider = NgxdProvider<FormArraySchema, Type<DynamicFormArrayComponentBase>>;

export const FORM_ARRAY_PROVIDER = new InjectionToken<FormArrayProvider[]>('Form Array Provider');

export function provideFormArray(
  type: FormArraySchema,
  component: Type<DynamicFormArrayComponentBase>
): ValueProvider[] {
  return [
    {
      provide: FORM_ARRAY_PROVIDER,
      useValue: { type, component } as FormArrayProvider,
      multi: true,
    },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
