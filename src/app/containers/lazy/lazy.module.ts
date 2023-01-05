import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DynamicLazyModule } from '@app/dynamics';

import { LazyPageComponent } from './lazy.component';
import { LazyRouting } from './lazy.routing';

@NgModule({
  imports: [
    CommonModule,
    LazyRouting,
    DynamicLazyModule.forChild('src/app/components/lazy/lazy.module#LazyModule'),
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
  ],
  declarations: [LazyPageComponent],
})
export class LazyPageModule {}
