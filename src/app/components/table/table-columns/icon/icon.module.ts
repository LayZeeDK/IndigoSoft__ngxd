import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

import { COMPONENT, PROVIDERS } from './icon.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class IconTableColumnModule {}
