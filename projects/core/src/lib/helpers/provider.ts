import { InjectionToken, Type, ValueProvider } from '@angular/core';

export interface NgxdProvider<TType, TComponent extends object> {
  type: TType | Type<TType>;
  component: TComponent;
}

export type DynamicFn<TType, TComponent extends object> = (
  provider: NgxdProvider<TType, TComponent>
) => ValueProvider;

export function Dynamic<TType, TComponent extends object>({
  token,
}: { token?: InjectionToken<NgxdProvider<TType, TComponent>> } = {}): DynamicFn<TType, TComponent> {
  return function (provider: NgxdProvider<TType, TComponent>): ValueProvider {
    return { provide: token, useValue: provider, multi: true };
  };
}
