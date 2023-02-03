import { Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

function _find<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
  control: AbstractControlSchema<T, K>,
  path: Array<K> | string | null,
  delimiter: string
): AbstractControlSchema<T, K> | null {
  if (path == null || path.length) {
    return null;
  }

  const pathArray = Array.isArray(path) ? path : (path.split(delimiter) as Array<K>);

  if (pathArray.length === 0) {
    return null;
  }

  return pathArray.reduce(
    (v: AbstractControlSchema<T, K> | null, name: K): AbstractControlSchema<T, K> | null => {
      if (v instanceof FormGroupSchema) {
        return name in v.controls ? v.controls[name] : null;
      }

      if (v instanceof FormArraySchema) {
        return v.at(<number>name) || null;
      }

      return null;
    },
    control
  );
}

export abstract class AbstractControlSchema<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> {
  key?: K | string;
  label?: string;
  subtitle?: string;
  disabled?: boolean;
  schema: AbstractControlSchema<T, K>;
  $type?: Type<T>;

  protected constructor(schema: Partial<AbstractControlSchema<T, K>>) {
    this.key = schema.key;
    this.label = schema.label;
    this.subtitle = schema.subtitle;
    this.disabled = schema.disabled;
    this.schema = schema as AbstractControlSchema<T, K>;
    this.$type = schema.$type;
  }

  enable() {
    this.disabled = false;
    this.schema.disabled = false;
  }
}

export class FormControlSchema<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> extends AbstractControlSchema<T, K> {
  formState: T | null = null;
  validator?: ValidatorFn | ValidatorFn[] | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

  constructor(
    schema: Partial<FormControlSchema<T, K>>,
    formState: T | null,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(schema);

    this.formState = (schema && schema.formState) || formState;
    this.validator = (schema && schema.validator) || validator;
    this.asyncValidator = (schema && schema.asyncValidator) || asyncValidator;
  }
}

export type FormGroupControls<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> = Record<K, AbstractControlSchema<T, K>>;

export type FormAbstractControls<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> = Record<K, AbstractControl>;

export class FormGroupSchema<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> extends AbstractControlSchema<T, K> {
  controls: FormGroupControls<T, K>;
  validator?: ValidatorFn | ValidatorFn[] | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

  constructor(
    schema: Partial<FormGroupSchema<T, K>>,
    controls: FormGroupControls<T, K>,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(schema);

    this.controls = (schema && schema.controls) || controls;
    this.validator = (schema && schema.validator) || validator;
    this.asyncValidator = (schema && schema.asyncValidator) || asyncValidator;
  }

  get(path: Array<K> | string): AbstractControlSchema<T, K> | null {
    return _find(this, path, '.');
  }
}

export class FormArraySchema<
  T extends { [P in keyof T]: T[K] },
  K extends keyof T = keyof T
> extends AbstractControlSchema<T, K> {
  controls: AbstractControlSchema<T, K>[];
  validator?: ValidatorFn | ValidatorFn[] | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

  constructor(
    schema: Partial<FormArraySchema<T, K>>,
    controls: AbstractControlSchema<T, K>[],
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(schema);

    this.controls = (schema && schema.controls) || controls;
    this.validator = (schema && schema.validator) || validator;
    this.asyncValidator = (schema && schema.asyncValidator) || asyncValidator;
  }

  push(control: AbstractControlSchema<T, K>): void {
    this.controls.push(control);
  }

  at(index: number): AbstractControlSchema<T, K> {
    return this.controls[index];
  }
}
