import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicTableColumnComponent } from './dynamic-table-column.component';
import { TableColumnComponentResolver } from './dynamic-table-column.resolver';

@NgModule({
  imports: [NgIf, NgxdModule],
  declarations: [DynamicTableColumnComponent],
  exports: [DynamicTableColumnComponent],
  providers: [TableColumnComponentResolver],
})
export class DynamicTableColumnModule {}
