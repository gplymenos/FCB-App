import { ComponentFixture, TestBed } from '@angular/core/testing';

import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../../../environments/environment';
import { firebaseUiAuthConfig } from '../../firebase.config';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [
        provideAnimations(),
        importProvidersFrom(
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireAuthModule,
          FirebaseUIModule.forRoot(firebaseUiAuthConfig)
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
