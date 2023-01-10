import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { DynamicEntityObject } from './DynamicEntityObject';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicEntityComponentBase {
  @Input() entity: DynamicEntityObject | null = null;

  @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
