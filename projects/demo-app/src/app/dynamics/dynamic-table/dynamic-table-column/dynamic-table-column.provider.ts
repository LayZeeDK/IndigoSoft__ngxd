import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';

import { DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TableColumnTypes } from './TableColumnTypes';

export type TableColumnProvider<TItem extends { [key: string]: unknown }> = NgxdProvider<
  TableColumnTypes,
  Type<DynamicTableColumnComponentBase<TItem>>
>;

export const TABLE_COLUMN_PROVIDER = new InjectionToken<
  TableColumnProvider<{ [key: string]: unknown }>[]
>('Table Column Provider');

export function provideTableColumn<TItem extends { [key: string]: unknown }>(
  type: TableColumnTypes,
  component: Type<DynamicTableColumnComponentBase<TItem>>
): Provider[] {
  return [
    { provide: TABLE_COLUMN_PROVIDER, useValue: { type, component }, multi: true },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
