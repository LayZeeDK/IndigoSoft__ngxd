import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';
import { DynamicFormGroupComponentBase, provideFormGroup } from '@app/dynamics';
import { AbstractControlSchema, FormGroupControls, FormGroupSchema } from '@ngxd/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent<T> extends DynamicFormGroupComponentBase<T> {
  String = String;

  toArray(controls: FormGroupControls<T> = {} as FormGroupControls<T>): AbstractControlSchema<T>[] {
    return Object.values(controls);
  }

  trackByKey: TrackByFunction<AbstractControlSchema<T>> = (index, schema) => schema.key;
}

export const COMPONENT = FormGroupComponent;
export const PROVIDERS = [provideFormGroup(FormGroupSchema, FormGroupComponent)];
