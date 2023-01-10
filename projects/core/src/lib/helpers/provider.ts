import { InjectionToken, Type, ValueProvider } from '@angular/core';

export type NgxdProvider<TType, TComponent extends Type<unknown>> =
  | {
      type: TType;
      component: TComponent;
    }
  | {
      type: Type<TType>;
      component: TComponent;
    };

export type DynamicFn<TType, TComponent extends Type<unknown>> = (
  provider: NgxdProvider<TType, TComponent>
) => ValueProvider;

export function Dynamic<TType, TComponent extends Type<unknown>>({
  token,
}: { token?: InjectionToken<NgxdProvider<TType, TComponent>> } = {}): DynamicFn<TType, TComponent> {
  return function (provider: NgxdProvider<TType, TComponent>): ValueProvider {
    return { provide: token, useValue: provider, multi: true };
  };
}
