import { importProvidersFrom } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { firebaseUiAuthConfig } from './firebase.config';

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
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
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
