import { isDevMode } from '@angular/core';
import { Subject } from 'rxjs';
import { getPropertyDescriptor, PRIVATE_CONTEXT_PREFIX } from '../utils';

const PRIVATE_HOST_INPUT_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_INPUT_ADAPTER';
const hostInputAdapters = new WeakMap<object, Map<string, HostInputAdapter<object, any>>>();

export class HostInputAdapter<TComponent extends object, TInputValue> {
  static for<TComponent extends object, TInputValue>(
    host: TComponent,
    name: string
  ): HostInputAdapter<TComponent, TInputValue> {
    const inputAdapters =
      hostInputAdapters.get(host) ?? new Map<string, HostInputAdapter<TComponent, TInputValue>>();
    hostInputAdapters.set(host, inputAdapters);

    const inputAdapterKey = PRIVATE_HOST_INPUT_ADAPTER + name;
    if (inputAdapters.has(inputAdapterKey)) {
      return inputAdapters.get(inputAdapterKey) as HostInputAdapter<TComponent, TInputValue>;
    } else {
      const inputAdapter = new HostInputAdapter<TComponent, TInputValue>(host, name);
      inputAdapters.set(inputAdapterKey, inputAdapter);

      return inputAdapter;
    }
  }

  changes: Subject<TInputValue>;
  defaultDescriptor?: PropertyDescriptor;
  value?: TInputValue;
  refCount: number;
  disposed = false;

  private constructor(private host: TComponent, private name: string) {
    this.changes = new Subject<TInputValue>();
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
    this.refCount = 0;

    const defaultValue = host[name as keyof TComponent];

    Object.defineProperty(host, name, {
      get: (): TInputValue | undefined => {
        if (this.defaultDescriptor && this.defaultDescriptor.get) {
          return this.defaultDescriptor.get.call(host);
        }
        return this.value;
      },
      set: (value: TInputValue) => {
        if (this.defaultDescriptor && this.defaultDescriptor.set) {
          this.defaultDescriptor.set.call(host, value);
        }

        this.value = value;
        this.changes.next(value);
      },
      configurable: true,
    });

    if (typeof defaultValue !== 'undefined') {
      host[name as keyof TComponent] = defaultValue;
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
    const defaultValue = this.host[this.name as keyof TComponent];

    this.disposed = true;
    this.changes.complete();

    if (this.defaultDescriptor) {
      if (this.defaultDescriptor.writable) {
        this.defaultDescriptor.value = defaultValue;
      }
      Object.defineProperty(this.host, this.name, this.defaultDescriptor);
      if (this.defaultDescriptor.set) {
        this.host[this.name as keyof TComponent] = defaultValue;
      }
    } else {
      delete this.host[this.name as keyof TComponent];
      this.host[this.name as keyof TComponent] = defaultValue;
    }
  }
}
