import { DynamicAction, DynamicEntityObject, TableColumn } from '@app/dynamics';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: 'dynamic-table.component.html',
  styleUrls: ['dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {
  @Input() schema: TableColumn[] | null = null;
  @Input() dataSource: CdkTableDataSourceInput<DynamicEntityObject> | null = null;

  @Output() action: EventEmitter<DynamicAction<DynamicEntityObject>> = new EventEmitter<
    DynamicAction<DynamicEntityObject>
  >();

  get displayedColumns(): string[] {
    return (this.schema ?? [])
      .filter(({ def }) => def)
      .filter(({ visible }) => visible)
      .map(({ def }) => def as string);
  }

  trackById: TrackByFunction<TableColumn> = (index, column) => column.def;
}
