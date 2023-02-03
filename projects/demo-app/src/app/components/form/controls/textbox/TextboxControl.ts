import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class TextboxControl<T, K extends keyof T = keyof T> extends FormControlSchema<Pick<T, K>> {
  type?: string;

  constructor(
    { type, ...args }: Partial<TextboxControl<T, K>>,
    formState: T | null = null,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
    this.type = type;
  }
}
