import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { DynamicFormModule } from '@app/dynamics';

import { TableColumnSchemaModalComponent } from './table-column-schema-modal.component';
import { TableSchemaBuilder } from './table-schema.builder';
import { TableSchemaComponent } from './table-schema.component';

@NgModule({
    imports: [CommonModule, DynamicFormModule, MatDialogModule, MatButtonModule, MatCardModule],
    declarations: [TableSchemaComponent, TableColumnSchemaModalComponent],
    exports: [TableSchemaComponent],
    providers: [TableSchemaBuilder]
})
export class TableSchemaModule {}
