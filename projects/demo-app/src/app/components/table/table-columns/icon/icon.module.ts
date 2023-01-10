import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { COMPONENT, PROVIDERS } from './icon.component';

@NgModule({
  imports: [NgIf, MatCardModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class IconTableColumnModule {}
