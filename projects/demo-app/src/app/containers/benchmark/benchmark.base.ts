import { AfterViewChecked, EventEmitter, Input, Output, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, Items, ItemsService, MeasureService, MeasureType } from './benchmark.service';

@Directive() // eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BenchmarkComponentBase implements AfterViewChecked {
  @Input() count = 0;
  @Input() repeat = 0;
  @Output() event: EventEmitter<number> = new EventEmitter<number>();

  items$: Observable<Items> = this.items.getItems();

  left = 0;

  protected constructor(
    private items: ItemsService,
    private measures: MeasureService,
    private type: MeasureType
  ) {}

  auto() {
    this.left = this.repeat;
    this.clear();
    this.create();
  }

  create() {
    this.items.createItems(this.count);
    this.measures.start(this.type);
  }

  clear() {
    this.items.clearItems();
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

  onEvent($event: number) {
    this.event.emit($event);
  }

  ngAfterViewChecked() {
    this.measures.stop();

    setTimeout(() => {
      if (this.left > 0 && !this.measures.measure) {
        this.left--;
        this.create();
      }
    }, 1);
  }
}
