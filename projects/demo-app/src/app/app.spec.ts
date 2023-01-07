import { NgZone } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { NgxdModule } from '@ngxd/core';
import { NgxdFormsModule } from '@ngxd/forms';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { LayoutModule } from './layout/layout.module';
import { By } from '@angular/platform-browser';

describe('demo-app', () => {
  async function setup() {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(ROUTES),
        NgxdModule,
        NgxdFormsModule.forRoot(),
        RouterModule,
        LayoutModule,
      ],
    });
    const rootFixture = TestBed.createComponent(AppComponent);
    const ngZone = TestBed.inject(NgZone);
    const router = TestBed.inject(Router);

    ngZone.run(() => router.initialNavigation());
    rootFixture.autoDetectChanges(true);
    await rootFixture.whenStable();

    return {
      getTitle(): string {
        const heading = rootFixture.debugElement.query(By.css('h1'))
          .nativeElement as HTMLHeadingElement;

        return heading.textContent.trim();
      },
    };
  }
  it('loads the default page', async () => {
    const { getTitle } = await setup();

    expect(getTitle()).toBe('Dynamic Heroes Example');
  });
});
