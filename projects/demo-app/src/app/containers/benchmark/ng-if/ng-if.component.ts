import { Directive } from '@angular/core';
import { BenchmarkComponentBase } from '../benchmark.base';
import { ItemsService, MeasureService } from '../benchmark.service';

@Directive()
export abstract class NgIfBenchmarkComponent extends BenchmarkComponentBase {
  constructor(items: ItemsService, measures: MeasureService) {
    super(items, measures, 'ng-if');
  }
}
