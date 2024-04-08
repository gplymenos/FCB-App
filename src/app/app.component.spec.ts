import { importProvidersFrom } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        importProvidersFrom(
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireAuthModule,
          FirebaseUIModule.forRoot(firebaseUiAuthConfig)
        ),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'fcb-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fcb-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'Fitness Class Booking - FCB'
    );
  });
});
