import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let el: DebugElement;
  let authServiceMock: any;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getLoggedUserUpdates',
    ]);
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 1 }]),
          },
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    el = fixture.debugElement;
    authServiceMock = TestBed.inject(AuthService);
    authServiceMock.getLoggedUserUpdates.and.returnValue(
      of({} as firebase.User)
    );
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should contain the header component', () => {
    const header = el.queryAll(By.css('app-header'));
    expect(header.length).toBeGreaterThan(0);
  });

  it('should contain the sideNav component', () => {
    const nav = el.queryAll(By.css('app-sidenav'));
    expect(nav.length).toBeGreaterThan(0);
  });
});
