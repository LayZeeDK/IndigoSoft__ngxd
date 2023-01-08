import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSchemaBuilder } from './forms.builder';
import { NgxdFormsModule } from './forms.module';

describe(NgxdFormsModule.name, () => {
  describe(NgxdFormsModule.forRoot.name, () => {
    function setup() {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, NgxdFormsModule.forRoot()],
      });
    }

    it(`provides ${FormSchemaBuilder.name}`, () => {
      setup();

      let builder: FormSchemaBuilder | undefined;

      expect(() => (builder = TestBed.inject(FormSchemaBuilder))).not.toThrow();
      expect(builder).toBeInstanceOf(FormSchemaBuilder);
    });
  });
});
