import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';
import { DynamicFormArrayComponentBase, provideFormArray } from '@app/dynamics';

@Component({
  selector: 'app-form-array',
  templateUrl: 'array.component.html',
  styleUrls: ['array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayComponent extends DynamicFormArrayComponentBase {
  @Input() override array: UntypedFormArray;
  @Input() override schema: FormArraySchema;

  trackByIndex(index): string {
    return String(index);
  }
}

export const COMPONENT = FormArrayComponent;
export const PROVIDERS = [provideFormArray(FormArraySchema, FormArrayComponent)];
