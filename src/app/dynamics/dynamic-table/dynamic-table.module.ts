import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { DynamicTableColumnModule } from './dynamic-table-column';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatTableModule, DynamicTableColumnModule],
  declarations: [DynamicTableComponent],
  exports: [DynamicTableComponent],
})
export class DynamicTableModule {}
