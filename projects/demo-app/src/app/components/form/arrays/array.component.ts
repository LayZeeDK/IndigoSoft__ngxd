import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { AbstractControlSchema, FormArraySchema } from '@ngxd/forms';
import { DynamicFormArrayComponentBase, provideFormArray } from '@app/dynamics';

@Component({
  selector: 'app-form-array',
  templateUrl: 'array.component.html',
  styleUrls: ['array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayComponent extends DynamicFormArrayComponentBase {
  @Input() override array: UntypedFormArray | null = null;
  @Input() override schema: FormArraySchema | null = null;

  trackByIndex: TrackByFunction<AbstractControlSchema> = (index) => String(index);
}

export const COMPONENT = FormArrayComponent;
export const PROVIDERS = [provideFormArray(FormArraySchema, FormArrayComponent)];
