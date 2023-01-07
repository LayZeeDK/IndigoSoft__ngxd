import { BindingDef, PropertyDef } from '../utils';
import { HostInputAdapter } from './host-input.adapter';

const hostAdapters = new WeakMap<object, HostAdapter<any, any>>();

export class HostAdapter<
  TComponent extends object,
  TInputValue extends TComponent[keyof TComponent]
> {
  static for<TComponent extends object, TInputValue extends TComponent[keyof TComponent]>(
    host: TComponent
  ): HostAdapter<TComponent, TInputValue> {
    return hostAdapters.has(host)
      ? (hostAdapters.get(host) as HostAdapter<TComponent, TInputValue>)
      : new HostAdapter<TComponent, TInputValue>(host);
  }

  inputs: Map<string, HostInputAdapter<TComponent, TInputValue>>;
  state: any;

  private constructor(private host: TComponent) {
    this.inputs = new Map<string, HostInputAdapter<TComponent, TInputValue>>();
    this.state = {};

    if (hostAdapters.has(host)) {
      return hostAdapters.get(host) as HostAdapter<TComponent, TInputValue>;
    } else {
      hostAdapters.set(host, this);
    }
  }

  attachInput(propertyDef: PropertyDef<TComponent>): BindingDef<TComponent> {
    const adapter = HostInputAdapter.for<TComponent, TInputValue>(
      this.host,
      propertyDef.outsidePropName
    );
    adapter.attach();
    this.inputs.set(propertyDef.outsidePropName, adapter);
    return { ...propertyDef, defaultDescriptor: adapter.defaultDescriptor };
  }

  getInputAdapter(
    bindingDef: BindingDef<TComponent>
  ): HostInputAdapter<TComponent, TInputValue> | undefined {
    return this.inputs.get(bindingDef.outsidePropName);
  }

  detachInput(bindingDef: BindingDef<TComponent>): void {
    const adapter = this.inputs.get(bindingDef.outsidePropName);
    adapter?.detach();

    if (adapter?.disposed) {
      this.inputs.delete(bindingDef.outsidePropName);
    }
  }
}
