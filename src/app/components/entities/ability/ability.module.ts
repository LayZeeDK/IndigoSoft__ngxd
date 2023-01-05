import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';

import { COMPONENT, PROVIDERS } from './ability.component';
import { SCHEMA_PROVIDERS } from './ability-schema.builder';

@NgModule({
  imports: [CommonModule, MatCardModule, MatDividerModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS, SCHEMA_PROVIDERS],
})
export class AbilityEntityModule {}
