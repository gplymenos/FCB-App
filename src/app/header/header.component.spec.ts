import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import {
  AuthService,
  FirebaseuiAuthComponent,
} from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { of } from 'rxjs';
import { SideNavService } from '../side-nav.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let authServiceMock: any;
  let dialog: any;
  let sideNavService: any;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getLoggedUserUpdates',
      'signOut',
    ]);

    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        authServiceMock = TestBed.inject(AuthService);
        dialog = TestBed.inject(MatDialog);
        sideNavService = TestBed.inject(SideNavService);
      });
  }));

  it('should create', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(
      of({} as firebase.User)
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the login button if user is not logged in', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(of(null));
    fixture.detectChanges();

    const loginBtn = el.queryAll(By.css('.loginBtn'));

    expect(loginBtn.length).toEqual(1);
  });

  it('should show the logout button if user is logged in', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(
      of({} as firebase.User)
    );
    fixture.detectChanges();

    const loginBtn = el.queryAll(By.css('.logoutBtn'));

    expect(loginBtn.length).toBe(1);
  });

  it('should toggle the drawer', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(
      of({} as firebase.User)
    );

    component.ngOnInit();
    const toggleSpy = spyOn(sideNavService, 'toggleSideBar');
    component.toggleDrawer();

    expect(sideNavService.toggleSideBar).toHaveBeenCalled();
  });

  it('should open the login dialog', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(of(null));

    component.ngOnInit();
    const loginSpy = spyOn(dialog, 'open');
    component.login();

    expect(dialog.open).toHaveBeenCalledWith(FirebaseuiAuthComponent);
  });

  it('should call signOut on logout', () => {
    authServiceMock.getLoggedUserUpdates.and.returnValue(of(null));
    fixture.detectChanges();
    component.logout();

    expect(authServiceMock.signOut).toHaveBeenCalled();
  });
});
