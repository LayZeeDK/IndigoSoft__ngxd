import { Input, Directive } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicFormGroupComponentBase {
  @Input() group: UntypedFormGroup;
  @Input() schema: FormGroupSchema;
}
