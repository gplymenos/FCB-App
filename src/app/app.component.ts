import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import firebase from 'firebase/compat';
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
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  loggedUserSubscription: Subscription;
  loggedInUser: firebase.User | null;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.subscribeAuthentication();

    this.loggedUserSubscription = this.authService.loggedUserChanged.subscribe(
      (user) => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      }
    );
  }

  login() {
    this.dialog.open(LoginModalComponent);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
  }
}
