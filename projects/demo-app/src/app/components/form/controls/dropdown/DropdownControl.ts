import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class DropdownControlOptions {
  key: string;
  value: any;

  constructor({ key, value }: Partial<DropdownControlOptions>) {
    this.key = key;
    this.value = value;
  }
}

export class DropdownControl extends FormControlSchema {
  options: DropdownControlOptions[] = [];

  constructor(
    { options, ...args }: Partial<DropdownControl>,
    formState?: any,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
    this.options = options;
  }
}
