import { NgModule } from '@angular/core';
import { Top20NgxdBenchmarkModule } from './ngxd-20/ngxd-20.module';
import { Top100NgxdBenchmarkModule } from './ngxd-100/ngxd-100.module';
import { Top1000NgxdBenchmarkModule } from './ngxd-1000/ngxd-1000.module';

@NgModule({
  exports: [Top20NgxdBenchmarkModule, Top100NgxdBenchmarkModule, Top1000NgxdBenchmarkModule],
})
export class NgxdBenchmarkModule {}
