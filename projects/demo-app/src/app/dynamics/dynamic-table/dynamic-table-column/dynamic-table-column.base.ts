import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { DynamicEntityObject } from '@app/dynamics';

import { TableColumn } from './TableColumn';

export interface DynamicAction<TItem> {
  type: 'delete' | 'edit';
  data: TItem;
}

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicTableColumnComponentBase {
  @Input() row: DynamicEntityObject | null = null;
  @Input() column: TableColumn = new TableColumn({});
  @Output() action: EventEmitter<DynamicAction<DynamicEntityObject>> = new EventEmitter<
    DynamicAction<DynamicEntityObject>
  >();
}
