import {
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { isObject } from '../objects/is-object';
import { NonNullish } from '../objects/non-nullish';
import { createComponentRef, Disposable, hasOnChangesHook } from '../utils';
import {
  DoCheckOnlyComponent,
  isLifecycleComponent,
  OnInitAndDoCheckComponent,
  OnInitOnlyComponent,
} from './lifecycle.components';

enum LifecycleStrategyType {
  Default,
  OnInitOnly,
  DoCheckOnly,
  OnInitAndDoCheck,
}

export type LifecycleComponent = (OnInit & DoCheck) | OnInit | DoCheck;

interface StrategyConfig {
  componentType?: Type<LifecycleComponent>;
  useOnInitComponent?: boolean;
  useDoCheckComponent?: boolean;
}

interface LifecycleComponents {
  onInitComponentRef: ComponentRef<LifecycleComponent> | null;
  doCheckComponentRef: ComponentRef<LifecycleComponent> | null;
}

const STRATEGY_CONFIG: { [key: number]: StrategyConfig } = {
  [LifecycleStrategyType.Default]: {},
  [LifecycleStrategyType.OnInitOnly]: {
    componentType: OnInitOnlyComponent,
    useOnInitComponent: true,
  },
  [LifecycleStrategyType.DoCheckOnly]: {
    componentType: DoCheckOnlyComponent,
    useDoCheckComponent: true,
  },
  [LifecycleStrategyType.OnInitAndDoCheck]: {
    componentType: OnInitAndDoCheckComponent,
    useOnInitComponent: true,
    useDoCheckComponent: true,
  },
};

const FEATURE_COMPONENTS_DISABLE = {
  onInitComponentRef: null,
  doCheckComponentRef: null,
};

function resolveLifecycleStrategy() {
  const USE_ONLY_INIT_AND_DO_CHECK_STRATEGY_FOR_IVY = LifecycleStrategyType.OnInitAndDoCheck;
  return STRATEGY_CONFIG[USE_ONLY_INIT_AND_DO_CHECK_STRATEGY_FOR_IVY];
}

function createLifecycleComponents(
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): LifecycleComponents {
  const config: StrategyConfig = resolveLifecycleStrategy();

  if (!config.componentType) {
    return FEATURE_COMPONENTS_DISABLE;
  }

  const lifecycleComponentRef = createComponentRef(
    config.componentType,
    viewContainerRef,
    componentFactoryResolver
  );

  return {
    onInitComponentRef: config.useOnInitComponent ? lifecycleComponentRef : null,
    doCheckComponentRef: config.useDoCheckComponent ? lifecycleComponentRef : null,
  };
}

export function attachLifecycle(
  componentRef: ComponentRef<LifecycleComponent>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): Disposable {
  const component = componentRef.instance;

  const lifecycleComponents = createLifecycleComponents(viewContainerRef, componentFactoryResolver);
  const components: NonNullish<LifecycleComponents> = {
    ...lifecycleComponents,
    onInitComponentRef: lifecycleComponents.onInitComponentRef ?? componentRef,
    doCheckComponentRef: lifecycleComponents.doCheckComponentRef ?? componentRef,
  };

  if (isObject<Partial<OnChanges>>(component) && hasOnChangesHook(component)) {
    if (isLifecycleComponent(components.onInitComponentRef.instance)) {
      components.onInitComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for OnInit on dynamic component');
    }

    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for DoCheck on dynamic component');
    }
  } else {
    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for DoCheck on dynamic component');
    }
  }

  return () => {
    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.destroy();
    }

    if (isLifecycleComponent(components.onInitComponentRef.instance)) {
      components.onInitComponentRef.destroy();
    }
  };
}
