import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicTableColumnComponentBase,
  provideTableColumn,
  TableColumnTypes,
} from '@app/dynamics';

@Component({
  selector: 'app-actions-table-column',
  templateUrl: 'actions.component.html',
  styleUrls: ['actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTableColumnEntityComponent<
  TItem extends { [key: string]: unknown }
> extends DynamicTableColumnComponentBase<TItem> {}

export const COMPONENT = ActionsTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(
  TableColumnTypes.Actions,
  ActionsTableColumnEntityComponent
);
