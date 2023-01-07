import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

export class CheckboxControl extends FormControlSchema {
  constructor(
    { ...args }: Partial<CheckboxControl>,
    formState?: any,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(args, formState, validator, asyncValidator);
  }
}
