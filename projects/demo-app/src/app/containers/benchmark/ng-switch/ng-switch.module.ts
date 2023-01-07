import { NgModule } from '@angular/core';
import { Top20NgSwitchBenchmarkModule } from './ng-switch-20/ng-switch-20.module';
import { Top100NgSwitchBenchmarkModule } from './ng-switch-100/ng-switch-100.module';
import { Top1000NgSwitchBenchmarkModule } from './ng-switch-1000/ng-switch-1000.module';

@NgModule({
  imports: [
    // These Angular modules are referenced to enable ESLint rules with
    // type-checking. Replace the Angular module listed in `exports` with
    // one of these to use it for the benchmark.
    Top100NgSwitchBenchmarkModule,
    Top1000NgSwitchBenchmarkModule,
  ],
  exports: [Top20NgSwitchBenchmarkModule],
})
export class NgSwitchBenchmarkModule {}
