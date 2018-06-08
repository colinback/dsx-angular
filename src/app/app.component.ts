import { Component, HostBinding, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from './shared/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  // Disable all Angular animations for the initial render.
  @HostBinding('@.disabled')
  isFetching = false;
  isStarting = true;
  isSideBySide = true;

  private sideBySideWidth = 992;

  get isOpened() { return this.isSideBySide; }
  get mode() { return this.isSideBySide ? 'side' : 'over'; }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private translate: TranslateService,
    private communication: CommunicationService
  ) {
    translate.addLangs(['en', 'zh-cn']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.subscription = communication.progressBarStatus$.subscribe(
      status => {
        this.isFetching = status.isFetching;
    });
  }

  ngOnInit() {
    this.onResize(window.innerWidth);

    // setTimeout(() => this.updateSideNav());
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
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
