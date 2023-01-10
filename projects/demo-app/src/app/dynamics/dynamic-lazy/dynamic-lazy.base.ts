import { Input, Directive } from '@angular/core';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicLazyComponentBase {
  @Input() name: string | null = null;
}
