import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { COMPONENTS, PROVIDERS } from './hello.component';

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  providers: [PROVIDERS],
})
export class HelloLazyModule {}
