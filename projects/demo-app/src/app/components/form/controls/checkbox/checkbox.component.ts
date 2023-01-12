import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicFormControlComponentBase, provideControl } from '@app/dynamics';
import { CheckboxControl } from './CheckboxControl';

@Component({
  selector: 'app-checkobox-control',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextboxControlComponent<T> extends DynamicFormControlComponentBase<T> {
  @Input() override schema: CheckboxControl<T> | null = null;
}

export const COMPONENT = TextboxControlComponent;
export const PROVIDERS = provideControl(CheckboxControl, TextboxControlComponent);
