import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthService } from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { Subscription } from 'rxjs';
import { routes } from '../app.routes';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatIcon],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawerEl') drawerEl: MatDrawer;
  routes: Routes;
  loggedUserSubscription: Subscription;
  loggedInUser: firebase.User | null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
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

    this.sideNavService.sideNavOpen.subscribe((openStatus: boolean) => {
      openStatus ? this.drawerEl.open() : this.drawerEl.close();
    });

    this.routes = routes.filter(
      (route) => route.data && route.data['showInNav']
    );
  }

  logout() {
    this.authService.signOut();
  }
}
