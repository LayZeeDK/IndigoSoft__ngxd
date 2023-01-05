import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { Top1000ComponentsModule } from '../../components/top-1000-components.module';
import { NgIf1000BenchmarkComponent } from './ng-if-1000.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top1000ComponentsModule],
  declarations: [NgIf1000BenchmarkComponent],
  exports: [NgIf1000BenchmarkComponent],
})
export class Top1000NgIfBenchmarkModule {}
