import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BenchmarkPageComponent } from './benchmark.component';
import { BenchmarkRouting } from './benchmark.routing';
import { NativeBenchmarkModule } from './native/native.module';
import { NgIfBenchmarkModule } from './ng-if/ng-if.module';
import { NgSwitchBenchmarkModule } from './ng-switch/ng-switch.module';

import { NgxdBenchmarkModule } from './ngxd/ngxd.module';

@NgModule({
  imports: [
    CommonModule,
    BenchmarkRouting,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    NgxdBenchmarkModule,
    NgSwitchBenchmarkModule,
    NgIfBenchmarkModule,
    NativeBenchmarkModule,
  ],
  declarations: [BenchmarkPageComponent],
})
export class BenchmarkPageModule {}
