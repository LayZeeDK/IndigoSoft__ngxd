import { NgModule } from '@angular/core';
import { Top20NgIfBenchmarkModule } from './ng-if-20/ng-if-20.module';
import { Top100NgIfBenchmarkModule } from './ng-if-100/ng-if-100.module';
import { Top1000NgIfBenchmarkModule } from './ng-if-1000/ng-if-1000.module';

@NgModule({
  exports: [Top20NgIfBenchmarkModule, Top100NgIfBenchmarkModule, Top1000NgIfBenchmarkModule],
})
export class NgIfBenchmarkModule {}
