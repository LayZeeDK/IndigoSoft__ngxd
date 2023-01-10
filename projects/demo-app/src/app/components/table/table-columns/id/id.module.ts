import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';

import { COMPONENT, PROVIDERS } from './id.component';

@NgModule({
  imports: [NgIf],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class IdTableColumnModule {}
