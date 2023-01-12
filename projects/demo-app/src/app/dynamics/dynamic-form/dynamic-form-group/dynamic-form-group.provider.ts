import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { DynamicFormGroupComponentBase } from './dynamic-form-group.base';
import { NgxdProvider } from '@ngxd/core';
import { FormGroupSchema } from '@ngxd/forms';

export type FormGroupProvider<T> = NgxdProvider<
  FormGroupSchema<T>,
  Type<DynamicFormGroupComponentBase<T>>
>;

export const FORM_GROUP_PROVIDER = new InjectionToken<FormGroupProvider<unknown>[]>(
  'Form Group Provider'
);

export function provideFormGroup<T>(
  type: Type<FormGroupSchema<T>>,
  component: Type<DynamicFormGroupComponentBase<T>>
): Provider {
  return [
    {
      provide: FORM_GROUP_PROVIDER,
      useValue: { type, component } as FormGroupProvider<T>,
      multi: true,
    },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
