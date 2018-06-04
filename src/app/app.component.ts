import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Disable all Angular animations for the initial render.
  @HostBinding('@.disabled')
  isStarting = true;
  isSideBySide = true;
  opened = true;

  get mode() { return this.isSideBySide ? 'side' : 'over'; }

  @ViewChild(MatSidenav) sidenav: MatSidenav;
}
