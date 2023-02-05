import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';

import { DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TABLE_COLUMN_PROVIDER, TableColumnProvider } from './dynamic-table-column.provider';
import { TableColumnTypes } from './TableColumnTypes';

@Injectable()
export class TableColumnComponentResolver<
  TItem extends { [key: string]: unknown }
> extends NgxdResolver<TableColumnTypes, Type<DynamicTableColumnComponentBase<TItem>>> {
  constructor(@Inject(TABLE_COLUMN_PROVIDER) providers: TableColumnProvider<TItem>[]) {
    super(providers);
  }
}
