import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
  AuthService,
  FirebaseuiAuthComponent,
} from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: firebase.User | null;
  loggedUserSubscription: Subscription;

  constructor(
    private firebaseAuthService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.firebaseAuthService
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
    this.dialog.open(FirebaseuiAuthComponent);
  }

  logout() {
    this.firebaseAuthService.signOut();
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
  }
}
