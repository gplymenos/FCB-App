import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { of } from 'rxjs';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let authServiceMock: any;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getLoggedUserUpdates',
    ]);
    TestBed.configureTestingModule({
      imports: [SidenavComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of([{ id: 1 }]) } },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    authServiceMock = TestBed.inject(AuthService);
    authServiceMock.getLoggedUserUpdates.and.returnValue(
      of({} as firebase.User)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
