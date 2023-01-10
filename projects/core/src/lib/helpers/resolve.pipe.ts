import { Pipe, PipeTransform, Type } from '@angular/core';
import { NgxdResolver } from './resolver';

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
  transform<TEntity, TComponent extends Type<unknown>>(
    resolver: Pick<NgxdResolver<TEntity, TComponent>, 'resolve'> | null,
    value: TEntity | null
  ): TComponent | null {
    return resolver && value && resolver.resolve(value);
  }
}
