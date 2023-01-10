import { Input, Directive } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicFormGroupComponentBase {
  @Input() group: UntypedFormGroup | null = null;
  @Input() schema: FormGroupSchema | null = null;
}
