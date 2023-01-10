import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import {
  DynamicEntityComponentBase,
  DynamicEntityModule,
  DynamicEntityObject,
} from '@app/dynamics';

import { Item } from './Item';

@Component({
  selector: 'app-item-entity',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemEntityComponent extends DynamicEntityComponentBase {
  @Input() override entity: Item | null = null;

  trackById: TrackByFunction<DynamicEntityObject> = (index, { id }) => id;
}

export const COMPONENT = ItemEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Item, ItemEntityComponent);
