import { Directive, Type } from '@angular/core';
import { BenchmarkComponentBase } from '../benchmark.base';
import { ItemsService, MeasureService } from '../benchmark.service';

export abstract class ComponentResolver<TComponent> {
  count: number;

  protected constructor(private components: Type<TComponent>[] = []) {
    this.count = components.length;
  }

  resolve(id: number): Type<TComponent> {
    return this.components[id];
  }
}

@Directive()
export abstract class NgxdBenchmarkComponent<TComponent> extends BenchmarkComponentBase {
  constructor(
    public resolver: ComponentResolver<TComponent>,
    items: ItemsService,
    measures: MeasureService
  ) {
    super(items, measures, 'ngxd');
  }
}
