import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, UntypedFormArray } from '@angular/forms';
import { TableSchema } from '@app/components';
import { AbstractControlSchema, FormArraySchema } from '@ngxd/forms';
import { concat, Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableSchemaBuilder } from './table-schema.builder';

@Injectable()
export class TableSchemaService implements OnDestroy {
  private form$: ReplaySubject<AbstractControl> = new ReplaySubject<AbstractControl>(1);
  private formSchema$: ReplaySubject<AbstractControlSchema> =
    new ReplaySubject<AbstractControlSchema>(1);

  constructor(private builder: TableSchemaBuilder) {}

  getForm(): Observable<AbstractControl> {
    return this.form$.asObservable();
  }

  getFormSchema(): Observable<AbstractControlSchema> {
    return this.formSchema$.asObservable();
  }

  getFormRawValue(): Observable<TableSchema> {
    return this.getForm().pipe(switchMap(this.extractValue));
  }

  getFormIsInvalid(): Observable<boolean> {
    return this.getForm().pipe(switchMap(this.extractFormIsInvalid));
  }

  createForm(schema: TableSchema): void {
    const formSchema: FormArraySchema = this.builder.formSchema(schema);
    const form: AbstractControl = this.builder.form(formSchema);
    form.patchValue(schema);
    form.markAsDirty();

    this.formSchema$.next(formSchema);
    this.form$.next(form);
  }

  ngOnDestroy() {
    this.form$.complete();
    this.formSchema$.complete();
  }

  private extractValue(form: AbstractControl): Observable<TableSchema> {
    return form.valueChanges.pipe(map(() => (<UntypedFormArray>form).getRawValue()));
  }

  private extractFormIsInvalid(form: AbstractControl): Observable<boolean> {
    return concat(of(form.invalid), form.valueChanges.pipe(map(() => form.invalid)));
  }
}
