import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';
import { DynamicEntityObject } from '@app/dynamics';
import { provideSchemaBuilder, SchemaBuilder } from '@app/schemas';
import { AbstractControlSchema, FormSchemaBuilder } from '@ngxd/forms';
import { Ability } from './Ability';

const ICONS = [
  'battle-axe-icon',
  'bowman-icon',
  'cracked-shield-icon',
  'crystal-wand-icon',
  'dripping-knife-icon',
  'fairy-wand-icon',
  'high-shot-icon',
  'quiver-icon',
  'reticule-icon',
  'stone-spear-icon',
  'sword-clash-icon',
  'sword-in-stone-icon',
  'swordman-icon',
  'wave-strike-icon',
];

@Injectable()
export class AbilitySchemaBuilder extends SchemaBuilder<DynamicEntityObject> {
  constructor(private fsb: FormSchemaBuilder) {
    super();
  }

  schema(entity: Ability): AbstractControlSchema<DynamicEntityObject> {
    return this.fsb.group(
      { key: 'entity', label: entity.name, subtitle: 'Ability', $type: Ability },
      {
        id: new TextboxControl<Ability>({
          key: 'id',
          label: 'Entity Def',
          type: 'text',
          validator: [Validators.required],
        }),
        name: new TextboxControl<Ability>({
          key: 'name',
          label: 'Name',
          type: 'text',
          validator: [Validators.required, Validators.minLength(2)],
        }),
        amount: new TextboxControl<Ability>({
          key: 'amount',
          label: 'Amount',
          type: 'text',
          validator: [Validators.required],
        }),
        icon: new DropdownControl<Ability>({
          key: 'icon',
          label: 'Icon',
          options: ICONS.map((icon) => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
      }
    ) as AbstractControlSchema<DynamicEntityObject>;
  }
}

export const SCHEMA_PROVIDERS = provideSchemaBuilder(Ability, AbilitySchemaBuilder);
