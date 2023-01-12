import { Input, Directive } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicFormGroupComponentBase<T> {
  @Input() group: UntypedFormGroup | null = null;
  @Input() schema: Partial<FormGroupSchema<T>> | null = null;
}
