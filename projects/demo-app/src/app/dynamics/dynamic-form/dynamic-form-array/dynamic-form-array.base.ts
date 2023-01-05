import { Input, Directive } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicFormArrayComponentBase {
  @Input() array: UntypedFormArray;
  @Input() schema: FormArraySchema;
}
