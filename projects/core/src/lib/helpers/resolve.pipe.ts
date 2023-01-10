import { Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
  transform<TEntity, TComponent>(
    resolver: { resolve: (type: Type<TEntity>) => Type<TComponent> | null } | null,
    value: TEntity | null
  ): Type<TComponent> | null;
  transform<TEntity, TComponent>(
    resolver: { resolve: (type: TEntity) => Type<TComponent> | null } | null,
    value: TEntity | null
  ): Type<TComponent> | null {
    return resolver && value && resolver.resolve(value);
  }
}
