import { SimpleChanges, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export interface ComponentState {
  name?: string;
  label?: string;
}

export interface ContextState {
  host: ComponentState;
  dynamic: ComponentState;
  type?: Type<unknown>;
}

export interface LifecycleState {
  ctor?: Type<unknown>;
  name: string;
  state: ComponentState;
  changes?: SimpleChanges;
}

export interface TestCaseState {
  context: ContextState;
  lifecycle: LifecycleState[];
}

export abstract class Executable {
  abstract execute(fixture: ComponentFixture<unknown>): Executable;

  abstract report(state: TestCaseState): TestCaseState;
}

export abstract class LifecycleReport {
  abstract canReport(oldState: ContextState, newState: ContextState): boolean;

  abstract report(oldState: ContextState, newState: ContextState): LifecycleState;
}
