import {
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';

export const PRIVATE_PREFIX = '__ngxOnChanges_';

export type Disposable = () => void;

export function hasOnChangesHook(component: Partial<OnChanges>): component is OnChanges {
  return !!component && hasProperty(component, 'ngOnChanges');
}

export function hasDoCheckHook(component: Partial<DoCheck>): component is DoCheck {
  return !!component && hasProperty(component, 'ngDoCheck');
}

export function hasOnInitHook(component: Partial<OnInit>): component is OnInit {
  return !!component && hasProperty(component, 'ngOnInit');
}

export function createComponentRef<T>(
  componentType: Type<T>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): ComponentRef<T> {
  const componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
  return viewContainerRef.createComponent(componentFactory, viewContainerRef.length);
}

export function runOnChangesHook<
  TContext extends { [PRIVATE_PREFIX]?: SimpleChanges | null } & Partial<OnChanges>
>(context: TContext): void {
  const simpleChanges = context[PRIVATE_PREFIX];

  if (simpleChanges != null && hasOnChangesHook(context)) {
    context.ngOnChanges(simpleChanges);
  }
  context[PRIVATE_PREFIX] = null;
}

export function hasProperty<TContext>(context: TContext, name: string): boolean {
  if (name in context) {
    return true;
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return hasProperty(prototype, name);
  }

  return false;
}

export function getPropertyDescriptor<TContext>(
  context: TContext,
  name: string
): PropertyDescriptor | undefined {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    return Object.getOwnPropertyDescriptor(context, name);
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return getPropertyDescriptor(prototype, name);
  }

  return void 0;
}

export function deletePropertyDescriptor<TContext>(context: TContext, name: string): void {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    delete context[name as keyof TContext];
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return deletePropertyDescriptor(prototype, name);
  }
}

export interface PropertyDef<TContext> {
  context: TContext;
  dynamicContext: TContext;
  hostContext: TContext;
  insidePropName: string & keyof TContext;
  outsidePropName: string & keyof TContext;
}

// {propName: "insidePropName", templateName: "outsidePropName"}
export function toPropertyDef<TContext>(
  context: TContext,
  dynamicContext: TContext,
  hostContext: TContext
): (property: { propName: string; templateName: string }) => PropertyDef<TContext> {
  return (property: { propName: string; templateName: string }) => ({
    context: context,
    dynamicContext: dynamicContext,
    hostContext: hostContext,
    insidePropName: property.propName as string & keyof TContext,
    outsidePropName: property.templateName as string & keyof TContext,
  });
}

export const PRIVATE_CONTEXT_PREFIX = '__ngxContext__';

export interface BindingDef<TContext> extends PropertyDef<TContext> {
  defaultDescriptor?: PropertyDescriptor;
}
