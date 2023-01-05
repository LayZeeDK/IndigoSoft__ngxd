import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EntitiesModule, FormSchemaModule, TableModule } from '@app/components';
import { DynamicTableModule } from '@app/dynamics';
import { EntitySchemaModule, SchemasModule, TableSchemaModule } from '@app/schemas';

import { TablePageComponent } from './table.component';
import { TableRouting } from './table.routing';

@NgModule({
  imports: [
    CommonModule,
    TableRouting,
    SchemasModule,
    EntitiesModule,
    EntitySchemaModule,
    FormSchemaModule,
    DynamicTableModule,
    TableModule,
    TableSchemaModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [TablePageComponent],
})
export class TablePageModule {}
