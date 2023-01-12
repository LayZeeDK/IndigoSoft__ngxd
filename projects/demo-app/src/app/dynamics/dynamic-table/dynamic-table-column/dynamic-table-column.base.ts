import { EventEmitter, Input, Output, Directive } from '@angular/core';

import { TableColumn } from './TableColumn';

export interface DynamicAction<TItem> {
  type: 'delete' | 'edit';
  data: TItem;
}

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicTableColumnComponentBase<TItem extends { [key: string]: unknown }> {
  @Input() row: TItem | null = null;
  @Input() column: TableColumn = new TableColumn({});
  @Output() action: EventEmitter<DynamicAction<TItem>> = new EventEmitter<DynamicAction<TItem>>();
}
