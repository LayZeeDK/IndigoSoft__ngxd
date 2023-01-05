import { Input, Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicFormControlComponentBase {
  @Input() control: UntypedFormControl;
  @Input() schema: FormControlSchema;
}
