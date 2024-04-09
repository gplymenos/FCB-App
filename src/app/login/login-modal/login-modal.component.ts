import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FirebaseUIModule,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    FirebaseUIModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  successCallback($event: FirebaseUISignInSuccessWithAuthResult) {
    this.dialog.closeAll();
  }

  submit(username: string, password: string, isRegisteration: boolean = false) {
    if (isRegisteration) {
      this.authService.signup(username, password);
    } else {
      this.authService.signInWithEmail(username, password);
    }
  }
}
