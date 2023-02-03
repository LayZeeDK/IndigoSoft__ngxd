import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class DropdownControlOptions<TInputValue> {
  key?: string;
  value?: TInputValue;

  constructor({ key, value }: Partial<DropdownControlOptions<TInputValue>>) {
    this.key = key;
    this.value = value;
  }
}

export class DropdownControl<T, K extends keyof T = keyof T> extends FormControlSchema<Pick<T, K>> {
  options: DropdownControlOptions<T[K]>[] = [];

  constructor(
    { options, ...args }: Partial<DropdownControl<T, K>>,
    formState: T | null = null,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
    this.options = options ?? [];
  }
}
