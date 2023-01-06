import { NgModule } from '@angular/core';
import { Top20NativeBenchmarkModule } from './native-20/native-20.module';
import { Top100NativeBenchmarkModule } from './native-100/native-100.module';
import { Top1000NativeBenchmarkModule } from './native-1000/native-1000.module';

@NgModule({
  exports: [Top20NativeBenchmarkModule, Top100NativeBenchmarkModule, Top1000NativeBenchmarkModule],
})
export class NativeBenchmarkModule {}
