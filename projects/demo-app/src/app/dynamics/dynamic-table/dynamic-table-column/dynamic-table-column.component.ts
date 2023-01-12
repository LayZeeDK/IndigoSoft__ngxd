import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DynamicAction, DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TableColumnComponentResolver } from './dynamic-table-column.resolver';
import { TableColumn } from './TableColumn';

@Component({
  selector: 'app-dynamic-table-column',
  templateUrl: 'dynamic-table-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableColumnComponent<
  TItem extends { [key: string]: unknown }
> extends DynamicTableColumnComponentBase<TItem> {
  @Input() override row: TItem | null = null;
  @Input() override column: TableColumn = new TableColumn({});
  @Output() override action: EventEmitter<DynamicAction<TItem>> = new EventEmitter<
    DynamicAction<TItem>
  >();

  constructor(public resolver: TableColumnComponentResolver) {
    super();
  }
}
