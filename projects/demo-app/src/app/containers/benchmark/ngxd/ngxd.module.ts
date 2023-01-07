import { NgModule } from '@angular/core';
import { Top20NgxdBenchmarkModule } from './ngxd-20/ngxd-20.module';
import { Top100NgxdBenchmarkModule } from './ngxd-100/ngxd-100.module';
import { Top1000NgxdBenchmarkModule } from './ngxd-1000/ngxd-1000.module';

@NgModule({
  imports: [
    // These Angular modules are referenced to enable ESLint rules with
    // type-checking. Replace the Angular module listed in `exports` with
    // one of these to use it for the benchmark.
    Top100NgxdBenchmarkModule,
    Top1000NgxdBenchmarkModule,
  ],
  exports: [Top20NgxdBenchmarkModule],
})
export class NgxdBenchmarkModule {}
