import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormGroupComponent } from './dynamic-form-group.component';
import { FormGroupComponentResolver } from './dynamic-form-group.resolver';

@NgModule({
  imports: [CommonModule, NgxdModule],
  declarations: [DynamicFormGroupComponent],
  exports: [DynamicFormGroupComponent],
  providers: [FormGroupComponentResolver],
})
export class DynamicFormGroupModule {}
