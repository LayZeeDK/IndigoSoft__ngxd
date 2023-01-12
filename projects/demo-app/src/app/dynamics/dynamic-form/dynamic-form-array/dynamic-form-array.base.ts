import { Input, Directive } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicFormArrayComponentBase<T> {
  @Input() array: UntypedFormArray | null = null;
  @Input() schema: Partial<FormArraySchema<T>> | null = null;
}
