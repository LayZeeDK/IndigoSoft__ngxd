import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  AbstractControlSchema,
  FormArraySchema,
  FormControlSchema,
  FormGroupSchema,
} from '@ngxd/forms';

// TODO(@LayZeeDK)
// Type `AbstractControl<any, any> | null` is not assignable to type
// `UntypedFormControl | null`.
// Type `AbstractControl<any, any>` is missing the following properties from
// type `FormControl<any>`: `defaultValue`, `registerOnChange`,
// `registerOnDisabledChange`

// Type `AbstractControlSchema | null` is not assignable to type
// `FormControlSchema | null`.
// Property `formState` is missing in type `AbstractControlSchema` but required
// in type `FormControlSchema`.

// Type `AbstractControl<any, any> | null` is not assignable to type
// `UntypedFormGroup | null`.
// Type `AbstractControl<any, any>` is missing the following properties from
// type `FormGroup<any>`: `controls`, `registerControl`, `addControl`,
// `removeControl`, and 2 more.

// Type `AbstractControlSchema | null` is not assignable to type
// `FormGroupSchema | null`.
// Type `AbstractControlSchema` is missing the following properties from type
// `FormGroupSchema`: `controls`, `get`

// Type `AbstractControl<any, any> | null` is not assignable to type
// `UntypedFormArray | null`.
// Type `AbstractControl<any, any>` is missing the following properties from
// type `FormArray<any>`: `controls`, `at`, `push`, `insert`, and 5 more.

// Type `AbstractControlSchema | null` is not assignable to type
// `FormArraySchema | null`.
// Type `AbstractControlSchema` is missing the following properties from type
// `FormArraySchema`: `controls`, `push`, `at`

@Component({
  selector: 'app-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent {
  @Input() form: AbstractControl | null = null;
  @Input() schema: AbstractControlSchema | null = null;

  isControl(schema: AbstractControlSchema | null): boolean {
    return schema instanceof FormControlSchema;
  }

  isGroup(schema: AbstractControlSchema | null): boolean {
    return schema instanceof FormGroupSchema;
  }

  isArray(schema: AbstractControlSchema | null): boolean {
    return schema instanceof FormArraySchema;
  }
}
