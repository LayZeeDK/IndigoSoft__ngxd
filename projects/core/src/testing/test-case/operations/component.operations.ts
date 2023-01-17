import { Type } from '@angular/core';
import { TestCaseState } from '../test-case.interfaces';
import { SimpleChangeInput } from './input.operations';

export class ChangeComponent extends SimpleChangeInput {
  constructor(protected override value?: Type<unknown>) {
    super('component', value);
  }

  override report(state: TestCaseState): TestCaseState {
    return {
      ...state,
      context: {
        ...state.context,
        type: this.value,
      },
    };
  }
}

export class ResetComponent extends ChangeComponent {
  constructor() {
    super(void 0);
  }
}
