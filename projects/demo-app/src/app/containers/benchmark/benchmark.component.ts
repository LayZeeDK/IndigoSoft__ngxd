import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Measures, MeasureService } from './benchmark.service';

export class MeasuresDataSource extends DataSource<Measures> {
  constructor(private measures$: Observable<Measures>) {
    super();
  }

  connect(): Observable<Measures[]> {
    return this.measures$.pipe(map((_) => Array.of(_)));
  }

  disconnect(): void {
    // No-op
  }
}

@Component({
  selector: 'app-benchmark-page',
  templateUrl: 'benchmark.component.html',
  styleUrls: ['benchmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MeasureService],
})
export class BenchmarkPageComponent {
  count = 20;
  repeat = 100;

  measures$: Observable<Measures> = this.measures.getMeasures();
  columns$: Observable<string[]> = this.measures$.pipe(map(Object.keys));

  dataSource: MeasuresDataSource = new MeasuresDataSource(this.measures$);

  constructor(private measures: MeasureService) {}

  onEvent($event: number) {
    console.log($event);
  }

  clear() {
    this.measures.clear();
  }
}
