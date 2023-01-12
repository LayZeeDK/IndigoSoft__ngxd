import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  AbstractControlSchema,
  FormArraySchema,
  FormControlSchema,
  FormGroupSchema,
} from '@ngxd/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent<T> {
  @Input() form: AbstractControl | null = null;
  @Input() schema: AbstractControlSchema<T> | null = null;

  isControl(schema: AbstractControlSchema<T> | null): boolean {
    return schema instanceof FormControlSchema;
  }

  isGroup(schema: AbstractControlSchema<T> | null): boolean {
    return schema instanceof FormGroupSchema;
  }

  isArray(schema: AbstractControlSchema<T> | null): boolean {
    return schema instanceof FormArraySchema;
  }
}
