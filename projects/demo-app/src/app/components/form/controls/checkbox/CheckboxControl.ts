import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class CheckboxControl<T, K extends keyof T = keyof T> extends FormControlSchema<Pick<T, K>> {
  constructor(
    { ...args }: Partial<CheckboxControl<T, K>>,
    formState: T | null = null,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
  }
}
