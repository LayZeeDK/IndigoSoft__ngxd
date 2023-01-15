import {
  Component,
  Input,
  NgModule,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('NgxComponentOutlet check custom projectable nodes', () => {
  let fixture: ComponentFixture<AppComponent>;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should render projectable nodes', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    content = fixture.nativeElement.innerHTML;

    expect(content).toContain('Dynamic Component');
    expect(content).toContain('name: Angular');
    expect(content).toContain('name: React');
  }));
});

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component name: {{ name }} <ng-content></ng-content>',
})
class DynamicComponent {
  @Input() name?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host',
  template: '',
})
class TestHostComponent {
  @Input() name?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-comp',
  template: `
    <app-test-host
      [name]="name"
      [ngxComponentOutlet]="component"
      [ngxComponentOutletContent]="projectableNodes"
    ></app-test-host>
    <ng-template><ng-content></ng-content></ng-template>
  `,
})
class TestComponent {
  @Input() name?: string;
  component: Type<DynamicComponent> = DynamicComponent;

  projectableNodes: Node[][] | null = null;

  @ViewChild(TemplateRef, { static: true }) set templateRef(templateRef: TemplateRef<HTMLElement>) {
    if (this.viewContainerRef && templateRef) {
      this.projectableNodes = [this.viewContainerRef.createEmbeddedView(templateRef).rootNodes];
    }
  }

  constructor(private viewContainerRef: ViewContainerRef) {}
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-component',
  template: `
    <app-test-comp [name]="'Angular'">
      <app-test-comp [name]="'React'"></app-test-comp>
    </app-test-comp>
  `,
})
class AppComponent {}

@NgModule({
  imports: [NgxdModule],
  declarations: [AppComponent, DynamicComponent, TestComponent, TestHostComponent],
  exports: [AppComponent, TestComponent, TestHostComponent],
})
class TestModule {}
