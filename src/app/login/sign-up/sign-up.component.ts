import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import firebase from 'firebase/compat';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  submit(username: string, password: string, displayName: string) {
    this.authService.signup(username, password).subscribe({
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
