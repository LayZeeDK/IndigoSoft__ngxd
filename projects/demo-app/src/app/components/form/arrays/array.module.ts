import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DynamicFormModule } from '@app/dynamics';

import { COMPONENT, PROVIDERS } from './array.component';

@NgModule({
  imports: [CommonModule, MatCardModule, DynamicFormModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class FormArraysModule {}
