import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@g.plymenos/ng-firebase-auth';
import { routes } from './app.routes';
import { firebaseProviders } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    firebaseProviders,
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(AuthModule),
  ],
};
