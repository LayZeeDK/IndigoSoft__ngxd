import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormBuilder, ValidatorFn } from '@angular/forms';
import { NgxdFormsUnexpectedControlSchemaError } from './errors/unexpected-control-schema-error';
import {
  AbstractControlSchema,
  FormAbstractControls,
  FormArraySchema,
  FormControlSchema,
  FormGroupControls,
  FormGroupSchema,
} from './forms.models';

@Injectable()
export class FormSchemaBuilder {
  constructor(private fb: UntypedFormBuilder) {}

  group<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: Partial<AbstractControlSchema<T, K>>,
    controlsConfig: FormGroupControls<T, K>,
    extra?: {
      validator?: ValidatorFn | ValidatorFn[] | null;
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
    } | null
  ): FormGroupSchema<T, K> {
    const controls = this._reduceControls(controlsConfig);
    const validator = extra != null ? extra['validator'] : null;
    const asyncValidator = extra != null ? extra['asyncValidator'] : null;

    return new FormGroupSchema(schema, controls, validator, asyncValidator);
  }

  control<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: Partial<AbstractControlSchema<T, K>>,
    formState: T | null,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormControlSchema<T, K> {
    return new FormControlSchema(schema, formState, validator, asyncValidator);
  }

  array<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: Partial<AbstractControlSchema<T, K>>,
    controlsConfig: AbstractControlSchema<T, K>[],
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormArraySchema<T, K> {
    const controls = controlsConfig.map((c) => this._createControl(c));
    return new FormArraySchema(schema, controls, validator, asyncValidator);
  }

  form<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: AbstractControlSchema<T, K>
  ): AbstractControl {
    const form: AbstractControl = this._createForm(schema);

    this._applyDisabled(form, schema);

    return form;
  }

  private _applyDisabled<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    form: AbstractControl,
    schema: AbstractControlSchema<T, K>
  ) {
    if (form.enabled && schema.disabled) {
      form.disable({ emitEvent: false, onlySelf: true });
    }

    if (form.disabled && !schema.disabled) {
      form.enable({ emitEvent: false, onlySelf: true });
    }
  }

  private _createForm<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: AbstractControlSchema<T, K>
  ) {
    if (schema instanceof FormControlSchema) {
      return this.fb.control(schema.formState, schema.validator, schema.asyncValidator);
    }

    if (schema instanceof FormGroupSchema) {
      return this.fb.group(this._reduceForm(schema), {
        validators: schema.validator,
        asyncValidators: schema.asyncValidator,
      });
    }

    if (schema instanceof FormArraySchema) {
      return this.fb.array(this._mapForm(schema), schema.validator, schema.asyncValidator);
    }

    throw new NgxdFormsUnexpectedControlSchemaError(schema);
  }

  private _reduceControls<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    controlsConfig: FormGroupControls<T, K>
  ): FormGroupControls<T, K> {
    const controls: FormGroupControls<T, K> = {} as FormGroupControls<T, K>;
    (Object.keys(controlsConfig) as Array<K>).forEach((controlName) => {
      controls[controlName] = this._createControl(controlsConfig[controlName]);
    });
    return controls;
  }

  private _createControl<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    controlConfig:
      | AbstractControlSchema<T, K>
      | Partial<AbstractControlSchema<T, K>>
      | [
          AbstractControlSchema<T, K>,
          T,
          ValidatorFn | ValidatorFn[],
          AsyncValidatorFn | AsyncValidatorFn[]
        ]
  ): AbstractControlSchema<T, K> {
    if (this._isFormSchema(controlConfig)) {
      return controlConfig as AbstractControlSchema<T, K>;
    }

    if (Array.isArray(controlConfig)) {
      const [schema, value, validator, asyncValidator] = controlConfig;

      return this.control(schema, value, validator, asyncValidator);
    }

    return this.control(controlConfig, null);
  }

  private _isFormSchema<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    controlConfig: unknown
  ): controlConfig is FormControlSchema<T, K> | FormGroupSchema<T, K> | FormArraySchema<T, K> {
    return (
      controlConfig instanceof FormControlSchema ||
      controlConfig instanceof FormGroupSchema ||
      controlConfig instanceof FormArraySchema
    );
  }

  private _mapForm<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: FormArraySchema<T, K>
  ): AbstractControl[] {
    return schema.controls.map((control) => this.form(control));
  }

  private _reduceForm<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
    schema: FormGroupSchema<T, K>
  ): FormAbstractControls<T, K> {
    const controls: FormAbstractControls<T, K> = {} as FormAbstractControls<T, K>;
    (Object.keys(schema.controls) as Array<K>).forEach(
      (key) => (controls[key] = this.form(schema.controls[key]))
    );
    return controls;
  }
}
