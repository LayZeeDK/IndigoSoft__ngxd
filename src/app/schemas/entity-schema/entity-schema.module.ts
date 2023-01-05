import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { DynamicFormModule } from '@app/dynamics';

import { EntitySchemaModalComponent } from './entity-schema-modal.component';
import { EntitySchemaComponent } from './entity-schema.component';

@NgModule({
    imports: [CommonModule, DynamicFormModule, MatDialogModule, MatButtonModule, MatCardModule],
    declarations: [EntitySchemaComponent, EntitySchemaModalComponent]
})
export class EntitySchemaModule {}
