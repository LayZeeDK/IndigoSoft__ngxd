import { SimpleChange, SimpleChanges } from '@angular/core';
import { isObject } from './is-object';

function isSimpleChange(x: unknown): x is SimpleChange {
  if (!isObject(x)) {
    return false;
  }

  const simpleChangeKeys: (keyof SimpleChange)[] = [
    'currentValue',
    'firstChange',
    'isFirstChange',
    'previousValue',
  ];

  return simpleChangeKeys.every((key) => key in x);
}

export function isSimpleChanges(x: unknown): x is SimpleChanges {
  if (!isObject(x)) {
    return false;
  }

  return Object.values(x).every(isSimpleChange);
}
