import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ISideNavService {
  toggleSideBar(): void;
}

@Injectable({ providedIn: 'root' })
export class SideNavService implements ISideNavService {
  sideNavOpen = new BehaviorSubject<boolean>(false);

  toggleSideBar() {
    this.sideNavOpen.next(!this.sideNavOpen.getValue());
  }
}
