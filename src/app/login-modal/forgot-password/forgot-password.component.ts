import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { loginFormStateEnum } from '../../enums/login.enums';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  @Output() formStateChanged = new EventEmitter();
  resetMessage = '';

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  resetPassword(email: string) {
    this.authService.resetPassword(email).subscribe({
      next: () => {
        this.resetMessage =
          'If the email provided matches, a Password Reset Email will be dispatched';
      },
      error: (error) => {
        const errorMessage = this.errorHandler.handleError(error);
        this.resetMessage = errorMessage;
      },
    });
  }

  clearForgottenForm() {
    this.resetMessage = '';
    this.formStateChanged.emit(loginFormStateEnum.SignIn);
  }
}
