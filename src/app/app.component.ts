import { Component, HostBinding, HostListener, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Disable all Angular animations for the initial render.
  @HostBinding('@.disabled')
  isStarting = true;
  isSideBySide = true;

  private sideBySideWidth = 992;

  get isOpened() { return this.isSideBySide; }
  get mode() { return this.isSideBySide ? 'side' : 'over'; }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this.onResize(window.innerWidth);

    // setTimeout(() => this.updateSideNav());
  }

  updateSideNav() {
    // Preserve current sidenav open state by default.
    const openSideNav = this.sidenav.opened;

    // May be open or closed when wide; always closed when narrow.
    this.sidenav.toggle(this.isSideBySide && openSideNav);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.isSideBySide = width > this.sideBySideWidth;
  }
}
