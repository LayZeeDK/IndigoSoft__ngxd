import { DataSource } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';

import { TableColumn } from './dynamic-table-column';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: 'dynamic-table.component.html',
  styleUrls: ['dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {
  @Input() schema: TableColumn[] = [];
  @Input() dataSource?: DataSource<any>;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  get displayedColumns(): string[] {
    return this.schema
      .filter(({ def }) => def)
      .filter(({ visible }) => visible)
      .map(({ def }) => def as string);
  }

  trackById: TrackByFunction<TableColumn> = (index, column) => column.def;
}
