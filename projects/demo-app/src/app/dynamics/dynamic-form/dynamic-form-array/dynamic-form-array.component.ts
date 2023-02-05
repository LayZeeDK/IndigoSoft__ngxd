import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicFormArrayComponentBase } from './dynamic-form-array.base';
import { FormArrayComponentResolver } from './dynamic-form-array.resolver';

@Component({
  selector: 'app-dynamic-form-array',
  templateUrl: 'dynamic-form-array.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormArrayComponent<T> extends DynamicFormArrayComponentBase<T> {
  constructor(public resolver: FormArrayComponentResolver<T>) {
    super();
  }
}
