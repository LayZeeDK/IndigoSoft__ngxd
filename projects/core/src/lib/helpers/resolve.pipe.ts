import { Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
  transform<TEntity, TComponent>(
    resolver: { resolve: (type: TEntity) => Type<TComponent> | null },
    value: TEntity
  ): Type<TComponent> | null {
    return resolver && resolver.resolve(value);
  }
}
