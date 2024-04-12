import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../../../environments/environment.prod';
import { firebaseUiAuthConfig } from '../../firebase.config';
import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, LoginModalComponent],
      providers: [
        provideAnimations(),
        importProvidersFrom(
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireAuthModule,
          FirebaseUIModule.forRoot(firebaseUiAuthConfig)
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
