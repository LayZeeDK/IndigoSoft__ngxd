import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { DynamicFormModule } from '@app/dynamics';

import { COMPONENT, PROVIDERS } from './array.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatCardModule, DynamicFormModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class FormArraysModule {}
