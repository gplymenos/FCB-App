import { TestBed } from '@angular/core/testing';
import { SideNavService } from './side-nav.service';

describe('SideNav', () => {
  let sidenavService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideNavService],
    });

    sidenavService = TestBed.inject(SideNavService);
  });

  it('should toggle the sidenav open variable', () => {
    sidenavService.toggleSideBar();
    expect(sidenavService.sideNavOpen.getValue()).toBeTrue();
  });
});
