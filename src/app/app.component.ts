import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from './login/login-modal/login-modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseUIModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authSubscription: Subscription;
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.subscribeAuthentication();
  }

  login() {
    this.dialog.open(LoginModalComponent);
  }

  logout() {
    this.authService.logout();
  }
}
