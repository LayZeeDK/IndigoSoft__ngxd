import { isObject } from '../objects/is-object';
import { PropertyDef, PRIVATE_CONTEXT_PREFIX, BindingDef } from '../utils';
import { HostInputAdapter } from './host-input.adapter';

export const PRIVATE_HOST_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_ADAPTER';

export class HostAdapter<TComponent extends { [P in keyof TComponent]: TComponent[P] }> {
  inputs: Map<string, HostInputAdapter<TComponent>> = new Map<
    string,
    HostInputAdapter<TComponent>
  >();
  refCount = 0;

  constructor(private host: TComponent) {
    if (isObject<TComponent>(host) && PRIVATE_HOST_ADAPTER in host) {
      return host[PRIVATE_HOST_ADAPTER as keyof TComponent];
    }

    host[PRIVATE_HOST_ADAPTER as keyof TComponent] = this as TComponent[keyof TComponent];
  }

  attach(): void {
    this.refCount++;
  }

  attachInput(propertyDef: PropertyDef<TComponent>): BindingDef<TComponent> {
    const adapter = new HostInputAdapter<TComponent>(this.host, propertyDef.outsidePropName);
    adapter.attach();
    this.inputs.set(propertyDef.outsidePropName, adapter);
    return { ...propertyDef, defaultDescriptor: adapter.defaultDescriptor };
  }

  getInputAdapter(bindingDef: BindingDef<TComponent>): HostInputAdapter<TComponent> | undefined {
    return this.inputs.get(bindingDef.outsidePropName);
  }

  detachInput(bindingDef: BindingDef<TComponent>): void {
    const adapter = this.inputs.get(bindingDef.outsidePropName);
    adapter?.detach();

    if (!adapter || adapter.disposed) {
      this.inputs.delete(bindingDef.outsidePropName);
    }
  }

  detach(): void {
    this.refCount--;

    if (this.refCount <= 0) {
      this.dispose();
    }
  }

  private dispose(): void {
    delete this.host[PRIVATE_HOST_ADAPTER as keyof TComponent];
  }
}
