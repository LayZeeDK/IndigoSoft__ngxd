import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicFormControlComponentBase } from './dynamic-form-control.base';
import { FormControlComponentResolver } from './dynamic-form-control.resolver';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: 'dynamic-form-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormControlComponent<T> extends DynamicFormControlComponentBase<T> {
  constructor(public resolver: FormControlComponentResolver<T>) {
    super();
  }
}
