import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { DynamicEntitiesModule } from '@app/dynamics';

import { SCHEMA_PROVIDERS } from './hero-schema.builder';
import { COMPONENT, PROVIDERS } from './hero.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicEntitiesModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
  ],
  declarations: [COMPONENT],
  providers: [PROVIDERS, SCHEMA_PROVIDERS],
})
export class HeroEntityModule {}
