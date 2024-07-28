import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  AuthService,
  FirebaseuiAuthComponent,
} from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { Subscription } from 'rxjs';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showFiller = false;
  loggedInUser: firebase.User | null;
  loggedUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private sideNavService: SideNavService
  ) {}

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

  toggleDrawer() {
    this.sideNavService.toggleSideBar();
  }

  login() {
    this.dialog.open(FirebaseuiAuthComponent);
  }

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
  }
}
