import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicTableColumnComponentBase,
  provideTableColumn,
  TableColumnTypes,
} from '@app/dynamics';

@Component({
  selector: 'app-icon-table-column',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTableColumnEntityComponent<
  TItem extends { [key: string]: unknown }
> extends DynamicTableColumnComponentBase<TItem> {}

export const COMPONENT = IconTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Icon, IconTableColumnEntityComponent);
