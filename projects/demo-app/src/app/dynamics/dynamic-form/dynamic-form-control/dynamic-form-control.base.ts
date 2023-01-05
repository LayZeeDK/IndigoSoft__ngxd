import { Input, Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicFormControlComponentBase {
  @Input() control: UntypedFormControl;
  @Input() schema: FormControlSchema;
}
