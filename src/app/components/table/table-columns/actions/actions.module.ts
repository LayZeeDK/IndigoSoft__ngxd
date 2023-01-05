import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

import { COMPONENT, PROVIDERS } from './actions.component';

@NgModule({
  imports: [CommonModule, MatMenuModule, MatButtonModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class ActionsTableColumnModule {}
