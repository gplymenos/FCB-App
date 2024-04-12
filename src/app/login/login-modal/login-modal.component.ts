import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import firebase from 'firebase/compat/app';
import {
  FirebaseUIModule,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    FirebaseUIModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SignUpComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  errorMessage = '';
  resetMessage = '';
  isSignup: boolean = false;
  forgotPassword: boolean = false;
  resetEmailSent: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {}

  successCallback($event: FirebaseUISignInSuccessWithAuthResult) {
    this.dialog.closeAll();
  }

  submit(username: string, password: string, isRegisteration: boolean = false) {
    {
      this.authService.signInWithEmail(username, password).subscribe({
        next: (userCredential: firebase.auth.UserCredential) => {
          console.log('userCredential');
          console.log(userCredential);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.handleError(error);
          console.log(errorMessage);
          this.errorMessage = errorMessage;
        },
      });
    }
  }

  resetPassword(email: string) {
    this.authService.resetPassword(email).subscribe({
      next: (userCredential) => {
        this.resetMessage =
          'If the email provided matches, a Password Reset Email will be dispatched';
      },
      error: (error) => {
        const errorMessage = this.errorHandler.handleError(error);
        console.log(errorMessage);
        this.resetMessage = errorMessage;
      },
    });
  }

  clearForgottenForm() {
    this.resetMessage = '';
    this.forgotPassword = false;
  }
}
