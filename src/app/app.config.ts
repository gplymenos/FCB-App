import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.prod';
import { routes } from './app.routes';
import { firebaseProviders } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    firebaseProviders,
    {
      provide: USE_AUTH_EMULATOR,
      useValue: !environment.production ? ['http://localhost:9099'] : undefined,
    },
    importProvidersFrom(MatNativeDateModule),
  ],
};
