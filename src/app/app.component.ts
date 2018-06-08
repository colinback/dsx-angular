import { Component, HostBinding, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from './shared/communication.service';
import { NotificationComponent } from './layout/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  /**
   * These CSS classes are computed from the current state of the application
   * (e.g. what document is being viewed) to allow for fine grain control over
   * the styling of individual pages.
   * You will get three classes:
   *
   * * `page-...`: computed from the current document id (e.g. events, guide-security, tutorial-toh-pt2)
   * * `folder-...`: computed from the top level folder for an id (e.g. guide, tutorial, etc)
   * * `view-...`: computef from the navigation view (e.g. SideNav, TopBar, etc)
   */
  @HostBinding('class')
  hostClasses = '';

  // Disable all Angular animations for the initial render.
  @HostBinding('@.disabled')
  isFetching = false;
  isStarting = true;
  isSideBySide = true;

  private sideBySideWidth = 992;

  get isOpened() { return this.isSideBySide; }
  get mode() { return this.isSideBySide ? 'side' : 'over'; }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @ViewChild(NotificationComponent)
  notification: NotificationComponent;
  notificationAnimating = false;

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

    setTimeout(() => this.updateShell());
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  updateShell() {
    // Update the SideNav state (if necessary).
    this.updateSideNav();

    // Update the host classes.
    this.updateHostClasses();
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

  notificationDismissed() {
    this.notificationAnimating = true;
    // this should be kept in sync with the animation durations in:
    // - src/styles/2-modules/_notification.scss
    // - src/app/layout/notification/notification.component.ts
    setTimeout(() => this.notificationAnimating = false, 250);
    this.updateHostClasses();
  }

  updateHostClasses() {
    const notificationClass = `app-notification-${this.notification.showNotification}`;
    const notificationAnimatingClass = this.notificationAnimating ? 'app-notification-animating' : '';
    this.hostClasses = [
      notificationClass,
      notificationAnimatingClass
    ].join(' ');
  }
}
