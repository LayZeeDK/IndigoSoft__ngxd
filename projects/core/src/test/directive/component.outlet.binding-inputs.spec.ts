import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';

describe('check binding inputs', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let content: string;

  beforeEach(() => {
    spyOn(console, 'error');
    spyOn(console, 'log');
    TestBed.configureTestingModule({
      imports: [TestModule],
    });
  });

  describe('with host component', () => {
    it('should bind inputs', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.name = 'React';
      component.label = 'Library';

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: React');
      expect(content).toContain('label: Library');
      expect(component.activatedComponent?.name).toBe('React');
      expect(component.activatedComponent?.label).toBe('Library');
    }));

    it('should save previous state of inputs when component re-rendered', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');
    }));

    it('should detect changes when component OnPush', fakeAsync(() => {
      TestBed.overrideComponent(DynamicComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      });
      TestBed.overrideComponent(AnotherDynamicComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');
    }));

    it('should binding when dynamic and host components have different input name', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = DifferentPropertiesDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      const activatedComponent =
        component.activatedComponent as DifferentPropertiesDynamicComponent;
      expect(content).toContain('Dynamic Different Properties Component');
      expect(content).toContain('name: Angular');
      expect(content).not.toContain('label: Framework');
      expect(activatedComponent.customName).toBe('Angular');
      expect(activatedComponent.label).toBeUndefined();
    }));

    it('should binding when dynamic and host component have different set of inputs', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = DifferentPropertiesDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      const activatedComponent =
        component.activatedComponent as DifferentPropertiesDynamicComponent;
      expect(content).toContain('Dynamic Different Properties Component');
      expect(content).toContain('name: Angular');
      expect(content).not.toContain('label: Framework');
      expect(activatedComponent.customName).toBe('Angular');
      expect(activatedComponent.label).toBeUndefined();
    }));

    it('should raise exception when dynamic component have input with getter only', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = WithGetterDynamicComponent as unknown as Type<TestComponent>;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic With Getter Component');
      expect(content).not.toContain('name: Angular');
      expect(content).not.toContain('label: Framework');
      expect(component.activatedComponent).toEqual(jasmine.any(WithGetterDynamicComponent));
      expect(component.activatedComponent?.name).toBeUndefined();
      expect(component.activatedComponent?.label).toBeUndefined();
      expect(console.log).toHaveBeenCalledOnceWith(
        jasmine.stringContaining(WithGetterDynamicComponent.name)
      );
      expect(console.log).toHaveBeenCalledOnceWith(jasmine.stringContaining('set customName'));
      expect(console.error).toHaveBeenCalledOnceWith(jasmine.any(TypeError));
      expect(console.error).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({
          message: jasmine.stringContaining('Cannot set property customName'),
        })
      );
    }));

    it('should binding when dynamic component have input with setter only', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = WithSetterDynamicComponent as unknown as Type<TestComponent>;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic With Setter Component');
      expect(content).not.toContain('name: Angular');
      expect(content).not.toContain('label: Framework');
      expect(component.activatedComponent?.name).toBeUndefined();
      expect(component.activatedComponent?.label).toBeUndefined();
    }));

    it('should binding when dynamic component have input with getter and setter', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
      expect(component.activatedComponent?.name).toBe('Angular');
      expect(component.activatedComponent?.label).toBe('Framework');

      component.component = WithGetterAndSetterDynamicComponent as unknown as Type<TestComponent>;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      const activatedComponent =
        component.activatedComponent as unknown as WithGetterAndSetterDynamicComponent;
      expect(content).toContain('Dynamic With Getter And Setter Component');
      expect(content).toContain('name: Angular');
      expect(content).not.toContain('label: Framework');
      expect(activatedComponent.customName).toBe('Angular');
      expect(component.activatedComponent?.label).toBeUndefined();
    }));

    it('should binding when host component have input with getter only', fakeAsync(() => {
      const template = `
            <app-test-host-with-getter [ngxComponentOutlet]="component"
                (ngxComponentOutletActivate)="activatedComponent = $event"></app-test-host-with-getter>`;

      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(component.activatedComponent?.name).toBe('Angular');

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: Angular');
      expect(component.activatedComponent?.name).toBe('Angular');
    }));

    it('should binding when host component have input with setter only', fakeAsync(() => {
      const template = `
                <app-test-host-with-setter [name]="name" [ngxComponentOutlet]="component"
                    (ngxComponentOutletActivate)="activatedComponent = $event"></app-test-host-with-setter>`;

      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).not.toContain('name: Angular');
      expect(component.activatedComponent?.name).toBeUndefined();

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).not.toContain('name: Angular');
      expect(component.activatedComponent?.name).toBeUndefined();

      component.name = 'React';

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: React');
      expect(component.activatedComponent?.name).toBe('React');
    }));

    it('should binding when host component have input with getter and setter', fakeAsync(() => {
      const template = `
            <app-test-host-with-getter-and-setter [name]="name" [ngxComponentOutlet]="component"
                (ngxComponentOutletActivate)="activatedComponent = $event"></app-test-host-with-getter-and-setter>`;

      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      const hostComponent = component.hostComponent as WithGetterAndSetterTestHostComponent;
      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(hostComponent._name).toBe('Angular');
      expect(component.activatedComponent?.name).toBe('Angular');

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: Angular');
      expect(hostComponent._name).toBe('Angular');
      expect(component.activatedComponent?.name).toBe('Angular');
    }));

    it('should binding when host component have input with getter and setter and method call', fakeAsync(() => {
      const template = `
            <app-test-host-with-method-call-in-setter [name]="name" [ngxComponentOutlet]="component"
                (ngxComponentOutletActivate)="activatedComponent = $event"></app-test-host-with-method-call-in-setter>`;

      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      expect(() => fixture.detectChanges()).not.toThrowError();
    }));

    it('should have input value when lifecycle hook onInit called', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      const activatedComponent = component.activatedComponent as unknown as DynamicComponent;
      const inputsOnInit = activatedComponent.inputsOnChanges;

      expect(activatedComponent.inputsOnChanges.length).toBe(1);
      expect(activatedComponent.inputsOnInit[0].name).toContain('Angular');
      expect(activatedComponent.inputsOnInit[0].label).toContain('Framework');

      component.component = AnotherDynamicComponent;
      fixture.detectChanges();
      component.component = DynamicComponent;
      fixture.detectChanges();

      expect(activatedComponent.inputsOnInit).not.toBe(inputsOnInit);
      expect(activatedComponent.inputsOnInit.length).toBe(1);
      expect(activatedComponent.inputsOnInit[0].name).toContain('Angular');
      expect(activatedComponent.inputsOnInit[0].label).toContain('Framework');
    }));

    it('should have input value when lifecycle hook onChanges called', fakeAsync(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      const activatedComponent = component.activatedComponent as unknown as DynamicComponent;
      expect(activatedComponent.inputsOnChanges.length).toBe(1);
      expect(activatedComponent.inputsOnChanges[0].name).toBe('Angular');
      expect(activatedComponent.inputsOnChanges[0].label).toBe('Framework');

      component.name = 'React';
      component.label = 'Library';
      fixture.detectChanges();

      expect(activatedComponent.inputsOnChanges.length).toBe(2);
      expect(activatedComponent.inputsOnChanges[1].name).toBe('React');
      expect(activatedComponent.inputsOnChanges[1].label).toBe('Library');
    }));

    it('should update saved value for binding', () => {
      const template = 'name: {{ name | json }}';
      TestBed.overrideComponent(DynamicComponent, { set: { template } });
      TestBed.overrideComponent(AnotherDynamicComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      component.name = [];
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([]);
      expect(content).toContain('name: []');

      component.name = [...component.name, 1];
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1]);
      expect(content).toContain('name: [\n  1\n]');

      component.component = AnotherDynamicComponent;
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1]);
      expect(content).toContain('name: [\n  1\n]');

      component.name = [...component.name, 2];
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1, 2]);
      expect(content).toContain('name: [\n  1,\n  2\n]');

      component.component = DynamicComponent;
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1, 2]);
      expect(content).toContain('name: [\n  1,\n  2\n]');

      component.name = [...component.name, 3];
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1, 2, 3]);
      expect(content).toContain('name: [\n  1,\n  2,\n  3\n]');

      component.component = AnotherDynamicComponent;
      component.name = [...component.name, 4];
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(component.activatedComponent?.name).toEqual([1, 2, 3, 4]);
      expect(content).toContain('name: [\n  1,\n  2,\n  3,\n  4\n]');
    });
  });

  describe('without host component', () => {
    it('should bind inputs without host', fakeAsync(() => {
      const template = `<ng-container *ngxComponentOutlet="component"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template: template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');

      component.name = 'React';
      component.label = 'Library';

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: React');
      expect(content).toContain('label: Library');
    }));

    it('should bind inputs without host in ngFor', fakeAsync(() => {
      const template = `
      <ng-container *ngFor="let name of names">
        <ng-container *ngxComponentOutlet="component; context: { name: name }">
      </ng-container></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template: template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      component.names = ['Angular', 'React'];

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular');
      expect(content).toContain('name: React');
      expect(content).toContain('label: Framework');

      component.names = ['Angular2', 'React2'];
      component.label = 'Library';

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular2');
      expect(content).toContain('name: React2');
      expect(content).toContain('label: Library');
    }));

    it('should bind inputs without host in ngFor with different context input names', fakeAsync(() => {
      const template = `
      <ng-container *ngFor="let name of names">
        <ng-container *ngxComponentOutlet="component; context: { name: name, customLabel: label }"></ng-container>
      </ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template: template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      component.component = DifferentPropertiesDynamicComponent;
      component.names = ['Angular', 'React'];

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular');
      expect(content).toContain('name: React');
      expect(content).toContain('label: Framework');

      component.names = ['Angular2', 'React2'];
      component.label = 'Library';

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('name: Angular2');
      expect(content).toContain('name: React2');
      expect(content).toContain('label: Library');
    }));

    it('should save previous state of inputs when component re-rendered without host', fakeAsync(() => {
      const template = `<ng-container *ngxComponentOutlet="component"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template: template } });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');

      component.component = AnotherDynamicComponent;

      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.innerHTML;

      expect(content).toContain('Dynamic Another Component');
      expect(content).toContain('name: Angular');
      expect(content).toContain('label: Framework');
    }));
  });
});

class BaseHostComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-dynamic',
  template: 'Dynamic Component name: {{ name }}, label: {{ label }}',
})
class DynamicComponent implements OnInit, OnChanges {
  @Input() name?: string;
  @Input() label?: string;

  inputsOnChanges: Pick<DynamicComponent, 'name' | 'label'>[] = [];
  simpleChanges: SimpleChanges[] = [];
  inputsOnInit: Pick<DynamicComponent, 'name' | 'label'>[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.inputsOnChanges.push({ name: this.name, label: this.label });
    this.simpleChanges.push(changes);
  }

  ngOnInit() {
    this.inputsOnInit.push({ name: this.name, label: this.label });
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-another-dynamic',
  template: 'Dynamic Another Component name: {{ name }}, label: {{ label }}',
})
class AnotherDynamicComponent {
  @Input() name?: string;
  @Input() label?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-different-properties-dynamic',
  template: 'Dynamic Different Properties Component name: {{ customName }}, label: {{ label }}',
})
class DifferentPropertiesDynamicComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('name') customName?: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('customLabel') label?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-with-getter-dynamic',
  template: 'Dynamic With Getter Component name: {{ customName }}',
})
class WithGetterDynamicComponent {
  private _customName?: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('name') get customName(): string | undefined {
    return this._customName;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-with-getter-and-setter-dynamic',
  template: 'Dynamic With Getter And Setter Component name: {{ customName }}',
})
class WithGetterAndSetterDynamicComponent {
  private _customName?: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('name')
  get customName(): string | undefined {
    return this._customName;
  }

  set customName(name: string | undefined) {
    this._customName = name;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-comp-a',
  template: 'Dynamic Empty Component',
})
class EmptyDynamicComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: TestHostComponent }],
})
class TestHostComponent {
  @Input() name?: string;
  @Input() label?: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host-with-getter',
  template: '',
})
class WithGetterTestHostComponent {
  getterCalled = false;

  get name(): string {
    this.getterCalled = true;
    return 'Angular';
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host-with-setter',
  template: '',
})
class WithSetterTestHostComponent {
  setterCalled = false;
  _name?: string;

  @Input() set name(name: string | undefined) {
    this.setterCalled = true;
    this._name = name;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host-with-getter-and-setter',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: WithGetterAndSetterTestHostComponent }],
})
class WithGetterAndSetterTestHostComponent {
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-host-with-method-call-in-setter',
  template: '',
  providers: [{ provide: BaseHostComponent, useExisting: WithMethodCallInSetterTestHostComponent }],
})
class WithMethodCallInSetterTestHostComponent {
  _name?: string;

  get name(): string | undefined {
    this.method();
    return this._name;
  }

  @Input()
  set name(name: string | undefined) {
    this._name = name;
    this.method();
  }

  private method(): void {
    return void 0;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-test-comp',
  template: `
    <app-test-host
      [name]="name"
      [label]="label"
      [ngxComponentOutlet]="component"
      [ngxComponentOutletContent]="projectableNodes"
      (ngxComponentOutletActivate)="activatedComponent = $event"
    ></app-test-host>
  `,
})
class TestComponent {
  name?: string | number[] = 'Angular';
  label? = 'Framework';
  names: string[] = [];
  component: Type<Pick<TestComponent, 'name' | 'label'>> = DynamicComponent;
  activatedComponent?: Pick<TestComponent, 'name' | 'label'>;
  projectableNodes: Node[][] | null = null;

  @ViewChild(BaseHostComponent, { static: true }) hostComponent!: TestHostComponent;
}

@NgModule({
  imports: [CommonModule, NgxdModule],
  declarations: [
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
    WithMethodCallInSetterTestHostComponent,
  ],
  exports: [
    TestComponent,
    TestHostComponent,
    WithGetterTestHostComponent,
    WithSetterTestHostComponent,
    WithGetterAndSetterTestHostComponent,
    WithMethodCallInSetterTestHostComponent,
  ],
})
class TestModule {}
