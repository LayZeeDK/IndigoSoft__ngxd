/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('NgxComponentOutlet check binding outputs', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let content: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should bind outputs', fakeAsync(() => {
    pending();
  }));

  it('should save previous output binding when component re-rendered', fakeAsync(() => {
    pending();
  }));
});

class BaseHostComponent {}

@Component({
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component name: {{ name }}, label: {{ label }} <ng-content></ng-content>',
})
class DynamicComponent implements OnInit, OnChanges {
  @Input() name?: string;
  @Input() label?: string;
  @Output() action: EventEmitter<unknown> = new EventEmitter<unknown>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit: EventEmitter<unknown> = new EventEmitter<unknown>();

  inputsOnChanges?: Pick<DynamicComponent, 'name' | 'label'>;
  simpleChanges?: SimpleChanges;
  inputsOnInit?: Pick<DynamicComponent, 'name' | 'label'>;

  ngOnChanges(changes: SimpleChanges) {
    this.inputsOnChanges = { name: this.name, label: this.label };
    this.simpleChanges = changes;
  }

  ngOnInit() {
    this.inputsOnInit = { name: this.name, label: this.label };
  }
}

@Component({
  selector: 'app-comp-another-dynamic',
  template: 'Dynamic Another Component name: {{ name }}, label: {{ label }}',
})
class AnotherDynamicComponent {
  @Input() name?: string;
  @Input() label?: string;
  @Output() action: EventEmitter<unknown> = new EventEmitter<unknown>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit: EventEmitter<unknown> = new EventEmitter<unknown>();
}

@Component({
  selector: 'app-comp-different-properties-dynamic',
  template: 'Dynamic Different Properties Component name: {{ customName }}, label: {{ label }}',
})
class DifferentPropertiesDynamicComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('name') customName?: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('customLabel') label?: string;
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('action') customAction: EventEmitter<unknown> = new EventEmitter<unknown>();
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('customSubmit') submit: EventEmitter<unknown> = new EventEmitter<unknown>();
}

@Component({
  selector: 'app-comp-with-getter-dynamic',
  template: 'Dynamic With Getter Component name: {{ customName }}',
})
class WithGetterDynamicComponent {
  private _customName?: string;

  @Input('name') get customName(): string | undefined {
    return this._customName;
  }
}

@Component({
  selector: 'app-comp-with-setter-dynamic',
  template: 'Dynamic With Setter Component name: {{ customName }}',
})
class WithSetterDynamicComponent {
  private _customName?: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('name') set customName(name: string | undefined) {
    this._customName = name;
  }
}

@Component({
  selector: 'app-comp-with-getter-and-setter-dynamic',
  template: 'Dynamic With Getter And Setter Component name: {{ customName }}',
})
class WithGetterAndSetterDynamicComponent {
  private _customName?: string;

  @Input('name')
  get customName(): string | undefined {
    return this._customName;
  }

  set customName(name: string | undefined) {
    this._customName = name;
  }
}

@Component({
  selector: 'app-comp-a',
  template: 'Dynamic Empty Component',
})
class EmptyDynamicComponent {}

@Component({
  selector: 'app-test-host',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: TestHostComponent }],
})
class TestHostComponent extends BaseHostComponent {
  @Input() name?: string;
  @Input() label?: string;
  @Output() action: EventEmitter<unknown> = new EventEmitter<unknown>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit: EventEmitter<unknown> = new EventEmitter<unknown>();
}

@Component({
  selector: 'app-test-host-with-getter',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: WithGetterTestHostComponent }],
})
class WithGetterTestHostComponent extends BaseHostComponent {
  getterCalled = false;

  get name(): string {
    this.getterCalled = true;
    return 'Angular';
  }
}

@Component({
  selector: 'app-test-host-with-setter',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: WithSetterTestHostComponent }],
})
class WithSetterTestHostComponent extends BaseHostComponent {
  setterCalled = false;
  _name: string | undefined;

  @Input() set name(name: string | undefined) {
    this.setterCalled = true;
    this._name = name;
  }
}

@Component({
  selector: 'app-test-host-with-getter-and-setter',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: WithGetterAndSetterTestHostComponent }],
})
class WithGetterAndSetterTestHostComponent extends BaseHostComponent {
  getterCalled = false;
  setterCalled = false;
  _name?: string;

  @Input()
  get name(): string | undefined {
    this.getterCalled = true;
    return this._name;
  }

  set name(name: string | undefined) {
    this.setterCalled = true;
    this._name = name;
  }
}

@Component({
  selector: 'app-test-comp',
  template: `
    <app-test-host
      [name]="name"
      [label]="label"
      (action)="action = $event"
      (submit)="submit = $event"
      [ngxComponentOutlet]="component"
      [ngxComponentOutletContent]="projectableNodes"
      (ngxComponentOutletActivate)="activatedComponent = $event"
      (ngxComponentOutletDeactivate)="deactivatedComponent = $event"
    ></app-test-host>
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
class TestComponent {
  @Input() name?: string | number[] = 'Angular';
  label? = 'Framework';
  component: Type<Pick<TestComponent, 'name' | 'label'>> = DynamicComponent;
  activatedComponent?: Pick<TestComponent, 'name' | 'label'>;
  deactivatedComponent?: Pick<TestComponent, 'name' | 'label'>;
  action: unknown;
  submit: unknown;

  projectableNodes: Node[][] | null = null;

  @ViewChild(BaseHostComponent, { static: true }) hostComponent!: TestHostComponent;

  @ViewChild(TemplateRef, { static: true }) set templateRef(templateRef: TemplateRef<HTMLElement>) {
    if (this.viewContainerRef && templateRef) {
      this.projectableNodes = [this.viewContainerRef.createEmbeddedView(templateRef).rootNodes];
    }
  }

  constructor(private viewContainerRef: ViewContainerRef) {}
}

@Component({
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
  declarations: [
    AppComponent,
    DynamicComponent,
    AnotherDynamicComponent,
    DifferentPropertiesDynamicComponent,
    EmptyDynamicComponent,
    WithGetterDynamicComponent,
    WithSetterDynamicComponent,
    WithGetterAndSetterDynamicComponent,
    TestComponent,
    TestHostComponent,
    WithGetterTestHostComponent,
    WithSetterTestHostComponent,
    WithGetterAndSetterTestHostComponent,
  ],
  exports: [
    AppComponent,
    TestComponent,
    TestHostComponent,
    WithGetterTestHostComponent,
    WithSetterTestHostComponent,
    WithGetterAndSetterTestHostComponent,
  ],
})
class TestModule {}
