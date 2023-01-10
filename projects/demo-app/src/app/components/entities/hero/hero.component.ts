import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import {
  DynamicEntityComponentBase,
  DynamicEntityModule,
  DynamicEntityObject,
} from '@app/dynamics';

import { Hero } from './Hero';

@Component({
  selector: 'app-hero-entity',
  templateUrl: 'hero.component.html',
  styleUrls: ['hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEntityComponent extends DynamicEntityComponentBase {
  @Input() override entity: Hero | null = null;
  @Input() name?: string;
  @Input() forInput?: string;

  trackById: TrackByFunction<DynamicEntityObject> = (index, { id }) => id;
}

export const COMPONENT = HeroEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Hero, HeroEntityComponent);
