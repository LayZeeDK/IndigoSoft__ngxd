/* eslint-disable @angular-eslint/component-selector */
import { Compiler, Component, NgModule, NgModuleFactory, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('NgxComponentOutlet check custom ngModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should use custom ngModuleFactory', () => {
    // Allow `Compiler` until we remove the deprecated property
    // `NgxComponentOutletDirective#ngxComponentOutletNgModuleFactory`.
    // eslint-disable-next-line deprecation/deprecation
    const compiler = TestBed.inject(Compiler);
    const fixture = TestBed.createComponent(WithNgModuleFactoryComponent);

    fixture.componentInstance.module = compiler.compileModuleSync(DynamicModule);
    fixture.detectChanges();

    const content = fixture.debugElement.nativeElement.innerHTML;
    expect(content).toContain('Dynamic Component');
  });

  it('should use custom ngModule', () => {
    const fixture = TestBed.createComponent(WithNgModuleComponent);

    fixture.componentInstance.module = DynamicModule;
    fixture.detectChanges();

    const content = fixture.debugElement.nativeElement.innerHTML;
    expect(content).toContain('Dynamic Component');
  });
});

@Component({
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component',
})
class DynamicComponent {}

@NgModule({
  declarations: [DynamicComponent],
})
class DynamicModule {}

@Component({
  selector: 'app-test-comp-with-ng-module-factory',
  template:
    '<ng-container *ngxComponentOutlet="component; ngModuleFactory: module"></ng-container>',
})
class WithNgModuleFactoryComponent {
  component: Type<DynamicComponent> = DynamicComponent;
  // Allow `NgModuleFactory` until we remove the deprecated property
  // `NgxComponentOutletDirective#ngxComponentOutletNgModuleFactory`.
  // eslint-disable-next-line deprecation/deprecation
  module: NgModuleFactory<DynamicModule> | null = null;
}

@Component({
  selector: 'app-test-comp-with-ng-module',
  template: '<ng-container *ngxComponentOutlet="component; ngModule: module"></ng-container>',
})
class WithNgModuleComponent {
  component: Type<DynamicComponent> = DynamicComponent;
  module: Type<DynamicModule> | null = null;
}

@NgModule({
  imports: [NgxdModule],
  declarations: [WithNgModuleFactoryComponent, WithNgModuleComponent],
  exports: [WithNgModuleFactoryComponent, WithNgModuleComponent],
})
class TestModule {}
