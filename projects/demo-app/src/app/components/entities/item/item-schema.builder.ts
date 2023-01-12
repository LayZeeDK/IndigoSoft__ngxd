import { Ability } from './../ability/Ability';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';
import { DynamicEntityObject } from '@app/dynamics';
import { CompositeSchemaBuilder, provideSchemaBuilder, SchemaBuilder } from '@app/schemas';
import { AbstractControlSchema, FormSchemaBuilder } from '@ngxd/forms';
import { Item } from './Item';

const ICONS = ['bow-icon', 'spear-icon', 'staff-icon'];
const RANKS = ['Spear', 'Staff', 'Bow'];

@Injectable()
export class ItemSchemaBuilder extends SchemaBuilder<DynamicEntityObject> {
  constructor(
    private fsb: FormSchemaBuilder,
    private builder: CompositeSchemaBuilder<DynamicEntityObject>
  ) {
    super();
  }

  schema(entity: Item): AbstractControlSchema<DynamicEntityObject> {
    return this.fsb.group(
      { key: 'entity', label: entity.name, subtitle: 'Item', $type: Item },
      {
        id: new TextboxControl<Item>({
          key: 'id',
          label: 'Entity Def',
          type: 'text',
          validator: [Validators.required],
        }),
        name: new TextboxControl<Item>({
          key: 'name',
          label: 'Name',
          type: 'text',
          validator: [Validators.required, Validators.minLength(2)],
        }),
        rank: new DropdownControl<Item>({
          key: 'rank',
          label: 'Rank',
          options: RANKS.map((icon) => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        icon: new DropdownControl<Item>({
          key: 'icon',
          label: 'Icon',
          options: ICONS.map((icon) => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        abilities: this.fsb.array(
          { key: 'abilities', label: 'Abilities', $type: Ability },
          entity.abilities.map((ability) => this.builder.schema(ability))
        ) as unknown as AbstractControlSchema<Item>,
      }
    ) as AbstractControlSchema<DynamicEntityObject>;
  }
}

export const SCHEMA_PROVIDERS = provideSchemaBuilder(Item, ItemSchemaBuilder);
