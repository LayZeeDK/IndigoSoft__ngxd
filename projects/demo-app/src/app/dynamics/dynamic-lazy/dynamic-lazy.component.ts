import {
  ChangeDetectionStrategy,
  Component,
  createNgModule,
  Inject,
  InjectionToken,
  Injector,
  Input,
  Type,
} from '@angular/core';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DynamicLazyComponentBase } from './dynamic-lazy.base';
import { LazyComponentResolver } from './dynamic-lazy.resolver';

export const LAZY_LOAD_MODULE = new InjectionToken<() => Promise<Type<unknown>>>(
  'LAZY_LOAD_MODULE'
);

@Component({
  selector: 'app-dynamic-lazy',
  templateUrl: 'dynamic-lazy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicLazyComponent extends DynamicLazyComponentBase {
  @Input() name: string;

  resolver$: Observable<LazyComponentResolver> = defer(() => this.lazyLoadModule()).pipe(
    map(ngModule => createNgModule(ngModule, this.injector).injector.get(LazyComponentResolver))
  );

  constructor(
    @Inject(LAZY_LOAD_MODULE) private lazyLoadModule: () => Promise<Type<unknown>>,
    private injector: Injector
  ) {
    super();
  }
}
