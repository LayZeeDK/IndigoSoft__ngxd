import { NgModule } from '@angular/core';
import { Top20NgSwitchBenchmarkModule } from './ng-switch-20/ng-switch-20.module';
import { Top100NgSwitchBenchmarkModule } from './ng-switch-100/ng-switch-100.module';
import { Top1000NgSwitchBenchmarkModule } from './ng-switch-1000/ng-switch-1000.module';

@NgModule({
  exports: [
    Top20NgSwitchBenchmarkModule,
    Top100NgSwitchBenchmarkModule,
    Top1000NgSwitchBenchmarkModule,
  ],
})
export class NgSwitchBenchmarkModule {}
