import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { MatNativeDateModule } from '@angular/material/core';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { environment } from '../environments/environment.prod';
import { routes } from './app.routes';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
    {
      provide: USE_AUTH_EMULATOR,
      useValue: !environment.production ? ['http://localhost:9099'] : undefined,
    },
    importProvidersFrom(MatNativeDateModule),
  ],
};
