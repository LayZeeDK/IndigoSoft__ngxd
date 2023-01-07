import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class TextboxControl extends FormControlSchema {
  type: string;

  constructor(
    { type, ...args }: Partial<TextboxControl>,
    formState?: any,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
    this.type = type;
  }
}
