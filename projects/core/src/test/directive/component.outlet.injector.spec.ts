import { Component, Injector, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('NgxComponentOutlet check custom injector', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should use custom injector', fakeAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const mock = {};
    component.injector = Injector.create({
      providers: [{ provide: mock, useValue: mock }],
      parent: fixture.componentRef.injector,
    });

    fixture.detectChanges();

    expect(component.activatedComponent.injector.get(mock)).toBe(mock);
  }));

  it('should create a new component when injector changes', fakeAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const mock = {};
    component.injector = Injector.create({
      providers: [{ provide: mock, useValue: mock }],
      parent: fixture.componentRef.injector,
    });

    fixture.detectChanges();

    const newMock = {};
    component.injector = Injector.create({
      providers: [{ provide: mock, useValue: newMock }],
      parent: fixture.componentRef.injector,
    });

    fixture.detectChanges();

    expect(component.activatedComponent.injector.get(mock)).toBe(newMock);
  }));
});

@Component({ selector: 'ngx-comp-dynamic', template: 'Dynamic Component' })
class DynamicComponent {
  constructor(public injector: Injector) {}
}

@Component({
  selector: 'ngx-test-comp',
  template: `
    <ng-container
      [ngxComponentOutlet]="component"
      [ngxComponentOutletInjector]="injector"
      (ngxComponentOutletActivate)="activatedComponent = $event"
    ></ng-container>
  `,
})
class TestComponent {
  injector: Injector;
  component: any = DynamicComponent;
  activatedComponent: any;
}

@NgModule({
  imports: [NgxdModule],
  declarations: [DynamicComponent, TestComponent],
  exports: [TestComponent],
})
class TestModule {}
