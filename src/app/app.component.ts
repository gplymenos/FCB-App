import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import firebase from 'firebase/compat';
import { FirebaseUIModule } from 'firebaseui-angular';
import { Subscription } from 'rxjs';
import { LoginModalComponent } from './login/login-modal/login-modal.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseUIModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  loggedUserSubscription: Subscription;
  loggedInUser: firebase.User | null;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService
      .getLoggedUserUpdates()
      .subscribe((user) => {
        if (user) {
          // User is logged in
          this.loggedInUser = user;
        } else {
          // User is not logged in or has logged out
          this.loggedInUser = null;
        }
      });
  }

  login() {
    this.dialog.open(LoginModalComponent);
  }

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
  }
}
