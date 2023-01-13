import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicEntityObject } from '@app/dynamics';

import { DynamicAction, DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TableColumnComponentResolver } from './dynamic-table-column.resolver';
import { TableColumn } from './TableColumn';

@Component({
  selector: 'app-dynamic-table-column',
  templateUrl: 'dynamic-table-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableColumnComponent extends DynamicTableColumnComponentBase {
  @Input() override row: DynamicEntityObject | null = null;
  @Input() override column: TableColumn = new TableColumn({});
  @Output() override action: EventEmitter<DynamicAction<DynamicEntityObject>> = new EventEmitter<
    DynamicAction<DynamicEntityObject>
  >();

  constructor(public resolver: TableColumnComponentResolver) {
    super();
  }
}
