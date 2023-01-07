import { NgModule } from '@angular/core';
import { Top20NgIfBenchmarkModule } from './ng-if-20/ng-if-20.module';
import { Top100NgIfBenchmarkModule } from './ng-if-100/ng-if-100.module';
import { Top1000NgIfBenchmarkModule } from './ng-if-1000/ng-if-1000.module';

@NgModule({
  imports: [
    // These Angular modules are referenced to enable ESLint rules with
    // type-checking. Replace the Angular module listed in `exports` with
    // one of these to use it for the benchmark.
    Top100NgIfBenchmarkModule,
    Top1000NgIfBenchmarkModule,
  ],
  exports: [Top20NgIfBenchmarkModule],
})
export class NgIfBenchmarkModule {}
