import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FirebaseUIModule } from 'firebaseui-angular';
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
  constructor(private authService: AuthService) {}

  public signInwithEmail(email: string, password: string) {
    this.authService.signInWithEmail(email, password);
  }

  public signUpWithEmail(email: string, password: string) {
    this.authService.signUpWithEmail(email, password);
  }
}
