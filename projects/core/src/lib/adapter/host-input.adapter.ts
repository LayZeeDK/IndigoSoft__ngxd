import { isDevMode } from '@angular/core';
import { Subject } from 'rxjs';
import { isObject } from '../objects/is-object';
import { getPropertyDescriptor, PRIVATE_CONTEXT_PREFIX } from '../utils';

export const PRIVATE_HOST_INPUT_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_INPUT_ADAPTER';

export class HostInputAdapter<
  TComponent extends { [P in keyof TComponent]: TComponent[P] },
  TInputValue extends TComponent[keyof TComponent] = TComponent[keyof TComponent]
> {
  changes: Subject<TInputValue | null> = new Subject<TInputValue | null>();
  defaultDescriptor?: PropertyDescriptor;
  value?: TInputValue;
  refCount = 0;
  disposed = false;

  constructor(private host: TComponent, private name: string & keyof TComponent) {
    if (isObject<TComponent>(host) && PRIVATE_HOST_INPUT_ADAPTER + name in host) {
      return host[(PRIVATE_HOST_INPUT_ADAPTER + name) as keyof TComponent];
    }

    host[(PRIVATE_HOST_INPUT_ADAPTER + name) as keyof TComponent] =
      this as TComponent[keyof TComponent];

    this.defaultDescriptor = getPropertyDescriptor(host, name);

    if (this.defaultDescriptor && this.defaultDescriptor.get && !this.defaultDescriptor.set) {
      if (isDevMode()) {
        const constructorName = host.constructor.name;
        console.log(`You should use get and set descriptors both with dynamic components:
ERROR: not found '${name}' input, it has setter only, please add getter!

  class ${constructorName} {

    // Please add that 👇
    get ${name}() { ... }

    set ${name}() { ... }

  }`);
      }
    }

    const defaultValue = host[name];

    Object.defineProperty(host, name, {
      get: (): TInputValue | undefined => {
        if (this.defaultDescriptor && this.defaultDescriptor.get) {
          return this.defaultDescriptor.get.call(host);
        }
        return this.value;
      },
      set: (value: TInputValue | undefined) => {
        if (this.defaultDescriptor && this.defaultDescriptor.set) {
          this.defaultDescriptor.set.call(host, value);
        }

        this.value = value;
        this.changes.next(value);
      },
      configurable: true,
    });

    if (typeof defaultValue !== 'undefined') {
      host[name] = defaultValue;
    }
  }

  attach(): void {
    this.refCount++;
  }

  detach(): void {
    this.refCount--;

    if (this.refCount <= 0) {
      this.dispose();
    }
  }

  private dispose(): void {
    const defaultValue = this.host[this.name];

    this.disposed = true;
    this.changes.complete();
    delete this.host[(PRIVATE_HOST_INPUT_ADAPTER + this.name) as keyof TComponent];

    if (this.defaultDescriptor) {
      if (this.defaultDescriptor.writable) {
        this.defaultDescriptor.value = defaultValue;
      }
      Object.defineProperty(this.host, this.name, this.defaultDescriptor);
      if (this.defaultDescriptor.set) {
        this.host[this.name] = defaultValue;
      }
    } else {
      delete this.host[this.name];
      this.host[this.name] = defaultValue;
    }
  }
}
