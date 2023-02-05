import { Type, Injectable } from '@angular/core';
import {
  ChangeComponent,
  ChangeInput,
  Operation,
  Operations,
  ResetComponent,
  ResetInput,
} from './operations/index';
import { Executable } from './test-case.interfaces';

@Injectable()
export class TestCaseBuilder {
  operations(operations: Executable[]): Operations {
    return new Operations(operations);
  }

  operation(operations: Executable[]): Operation {
    return new Operation(operations);
  }

  changeInput(name: string, value: unknown): ChangeInput {
    return new ChangeInput(name, value);
  }

  resetInput(name: string): ResetInput {
    return new ResetInput(name);
  }

  changeComponent(component: Type<unknown>): ChangeComponent {
    return new ChangeComponent(component);
  }

  resetComponent(): ResetComponent {
    return new ResetComponent();
  }
}
