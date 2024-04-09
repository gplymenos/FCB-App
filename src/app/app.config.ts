import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'fitness-class-booking---fcb',
          appId: '1:525203512132:web:615673b5d8068c07381511',
          storageBucket: 'fitness-class-booking---fcb.appspot.com',
          apiKey: 'AIzaSyBmn2ZX4OQA3VEn6Qgqd7F69rmXKs-bgDE',
          authDomain: 'fitness-class-booking---fcb.firebaseapp.com',
          messagingSenderId: '525203512132',
          measurementId: 'G-Z1YV5SS52J',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(providePerformance(() => getPerformance())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(MatNativeDateModule),
    {
      provide: USE_AUTH_EMULATOR,
      useValue: !environment.production ? ['http://localhost:9099'] : undefined,
    },
    provideAnimationsAsync('noop'),
  ],
};
