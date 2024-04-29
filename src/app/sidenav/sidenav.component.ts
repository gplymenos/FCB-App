import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements AfterViewInit {
  @Output('drawer') drawer = new EventEmitter();
  @ViewChild('drawerEl') drawerEl: MatDrawer;

  ngAfterViewInit(): void {
    this.drawer.emit(this.drawerEl);
  }
}
