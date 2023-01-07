import { NgModule } from '@angular/core';
import { Top20NativeBenchmarkModule } from './native-20/native-20.module';
import { Top100NativeBenchmarkModule } from './native-100/native-100.module';
import { Top1000NativeBenchmarkModule } from './native-1000/native-1000.module';

@NgModule({
  imports: [
    // These Angular modules are referenced to enable ESLint rules with
    // type-checking. Replace the Angular module listed in `exports` with
    // one of these to use it for the benchmark.
    Top100NativeBenchmarkModule,
    Top1000NativeBenchmarkModule,
  ],
  exports: [Top20NativeBenchmarkModule],
})
export class NativeBenchmarkModule {}
