import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { FirebaseUIModule } from 'firebaseui-angular';
import { loginFormStateEnum } from '../enums/login.enums';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  imports: [
    CommonModule,
    FirebaseUIModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
  ],
})
export class LoginModalComponent {
  loginFormStatus = loginFormStateEnum;
  formState: loginFormStateEnum = loginFormStateEnum.SignIn;
  resetEmailSent: boolean = false;

  constructor(private dialog: MatDialog) {}

  successCallback() {
    this.dialog.closeAll();
  }

  formStateChanged(event: loginFormStateEnum) {
    this.formState = event;
  }
}
