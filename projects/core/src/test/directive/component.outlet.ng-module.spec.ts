/* eslint-disable @angular-eslint/component-selector */
import { Compiler, Component, NgModule, NgModuleFactory, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('NgxComponentOutlet check custom ngModule', () => {
  let fixture: ComponentFixture<TestComponent>;
  let compiler: Compiler;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should use custom ngModuleFactory', fakeAsync(() => {
    compiler = TestBed.inject(Compiler);
    fixture = TestBed.createComponent(TestComponent);

    fixture.componentInstance.module = compiler.compileModuleSync(DynamicModule);
    fixture.detectChanges();

    content = fixture.debugElement.nativeElement.innerHTML;
    expect(content).toContain('Dynamic Component');
  }));
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
  selector: 'app-test-comp',
  template:
    '<ng-container *ngxComponentOutlet="component; ngModuleFactory: module"></ng-container>',
})
class TestComponent {
  component: Type<DynamicComponent> = DynamicComponent;
  module: NgModuleFactory<DynamicModule> | null = null;
}

@NgModule({
  imports: [NgxdModule],
  declarations: [TestComponent],
  exports: [TestComponent],
})
class TestModule {}
