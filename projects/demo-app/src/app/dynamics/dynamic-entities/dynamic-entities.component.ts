import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';

import { DynamicEntityObject, EntityComponentResolver } from './dynamic-entity';

@Component({
  selector: 'app-dynamic-entities',
  templateUrl: 'dynamic-entities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicEntitiesComponent {
  @Input() name?: string;
  @Input() entities: DynamicEntityObject[] = [];
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  constructor(public resolver: EntityComponentResolver) {}

  trackById: TrackByFunction<DynamicEntityObject> = (index, entity) => entity.id;
}
