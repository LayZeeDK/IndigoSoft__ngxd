import {
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { isObject } from './is-object';
import { isSimpleChanges } from './is-simple-changes';

export const PRIVATE_PREFIX = '__ngxOnChanges_';

export type Disposable = () => void;

export function hasOnChangesHook(component: unknown): component is OnChanges {
  return hasProperty(component, 'ngOnChanges');
}

export function hasDoCheckHook(component: unknown): component is DoCheck {
  return hasProperty(component, 'ngDoCheck');
}

export function hasOnInitHook(component: unknown): component is OnInit {
  return hasProperty(component, 'ngOnInit');
}

export function createComponentRef<T>(
  componentType: Type<T>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): ComponentRef<T> {
  const componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
  return viewContainerRef.createComponent(componentFactory, viewContainerRef.length);
}

// TODO(@LayZeeDK): Is `context` actually `component` as in `hasOnChangesHook`?
export function runOnChangesHook(context: unknown): void {
  if (!isObject(context)) {
    return;
  }

  const simpleChanges = context[PRIVATE_PREFIX];

  if (isSimpleChanges(simpleChanges) && hasOnChangesHook(context)) {
    context.ngOnChanges(simpleChanges);
  }
  context[PRIVATE_PREFIX] = null;
}

export function hasProperty(context: unknown, name: string): boolean {
  if (!isObject(context)) {
    return false;
  }

  if (name in context) {
    return true;
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return hasProperty(prototype, name);
  }

  return false;
}

export function getPropertyDescriptor(context: any, name: string): PropertyDescriptor | undefined {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    return descriptor;
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return getPropertyDescriptor(prototype, name);
  }

  return undefined;
}

export function deletePropertyDescriptor(context: any, name: string): void {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    delete context[name];
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return deletePropertyDescriptor(prototype, name);
  }
}

export interface PropertyDef<T extends object> {
  context: T;
  dynamicContext: T;
  hostContext: T;
  insidePropName: string;
  outsidePropName: string;
}

// {propName: "insidePropName", templateName: "outsidePropName"}
export function toPropertyDef<T extends object>(
  context: T,
  dynamicContext: T,
  hostContext: T
): (property: { propName: string; templateName: string }) => PropertyDef<T> {
  return (property: { propName: string; templateName: string }) => ({
    context: context,
    dynamicContext: dynamicContext,
    hostContext: hostContext,
    insidePropName: property.propName,
    outsidePropName: property.templateName,
  });
}

export const PRIVATE_CONTEXT_PREFIX = '__ngxContext__';

export interface BindingDef<T extends object> extends PropertyDef<T> {
  defaultDescriptor?: PropertyDescriptor;
}
