import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthService } from '@g.plymenos/ng-firebase-auth';
import firebase from 'firebase/compat';
import { Subscription } from 'rxjs';
import { routes } from '../app.routes';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatIcon],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @Output('drawer') drawer = new EventEmitter();
  @ViewChild('drawerEl') drawerEl: MatDrawer;
  routes: Routes;
  loggedUserSubscription: Subscription;
  loggedInUser: firebase.User | null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
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

    this.routes = routes.filter(
      (route) => route.data && route.data['showInNav']
    );
  }

  ngAfterViewInit(): void {
    this.drawer.emit(this.drawerEl);
  }

  logout() {
    this.authService.signOut();
  }
}
