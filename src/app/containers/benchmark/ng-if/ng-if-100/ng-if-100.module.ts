import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { Top100ComponentsModule } from '../../components/top-100-components.module';
import { NgIf100BenchmarkComponent } from './ng-if-100.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top100ComponentsModule],
  declarations: [NgIf100BenchmarkComponent],
  exports: [NgIf100BenchmarkComponent],
})
export class Top100NgIfBenchmarkModule {}
