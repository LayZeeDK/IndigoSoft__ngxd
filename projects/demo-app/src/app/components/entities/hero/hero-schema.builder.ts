import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';
import { DynamicEntityObject } from '@app/dynamics';
import { CompositeSchemaBuilder, provideSchemaBuilder, SchemaBuilder } from '@app/schemas';
import { AbstractControlSchema, FormSchemaBuilder } from '@ngxd/forms';
import { Hero } from './Hero';

const ICONS = ['knight-icon', 'wizard-icon', 'archer-icon'];
const RANKS = ['Knight', 'Wizard', 'Archer'];

@Injectable()
export class HeroSchemaBuilder extends SchemaBuilder<DynamicEntityObject> {
  constructor(
    private fsb: FormSchemaBuilder,
    private builder: CompositeSchemaBuilder<DynamicEntityObject>
  ) {
    super();
  }

  schema(entity: Hero): AbstractControlSchema<DynamicEntityObject> {
    return this.fsb.group(
      { key: 'entity', label: entity.name, subtitle: 'Hero', $type: Hero },
      {
        id: new TextboxControl<Hero>({
          key: 'id',
          label: 'Entity Def',
          type: 'text',
          validator: [Validators.required],
        }),
        name: new TextboxControl<Hero>({
          key: 'name',
          label: 'Name',
          type: 'text',
          validator: [Validators.required, Validators.minLength(2)],
        }),
        rank: new DropdownControl<Hero>({
          key: 'rank',
          label: 'Rank',
          options: RANKS.map((icon) => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        icon: new DropdownControl<Hero>({
          key: 'icon',
          label: 'Icon',
          options: ICONS.map((icon) => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        abilities: this.fsb.array(
          { key: 'abilities', label: 'Abilities' },
          entity.abilities.map((ability) => this.builder.schema(ability))
        ) as unknown as AbstractControlSchema<Hero>,
        items: this.fsb.array(
          { key: 'items', label: 'Items' },
          entity.items.map((item) => this.builder.schema(item))
        ) as unknown as AbstractControlSchema<Hero>,
      }
    ) as AbstractControlSchema<DynamicEntityObject>;
  }
}

export const SCHEMA_PROVIDERS = provideSchemaBuilder(Hero, HeroSchemaBuilder);
