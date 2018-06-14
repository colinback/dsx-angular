import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, trigger, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { EventManager } from 'app/shared/event-manager.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('hideAnimation', [
      state('show', style({height: '*'})),
      state('hide', style({height: 0})),
      // this should be kept in sync with the animation durations in:
      // - src/styles/2-modules/_notification.scss
      // - src/app/app.component.ts : notificationDismissed()
      transition('show => hide', animate(250)),
      transition('hide => show', animate(250))
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() icon: string;
  @Input() iconLabel: string;

  @Output() dismissed = new EventEmitter();

  @HostBinding('@hideAnimation')
  showNotification: 'show'|'hide';

  notificationListener: Subscription;
  message: string;

  constructor(
    private eventManager: EventManager
  ) {
    this.notificationListener = eventManager.subscribe('dsxApp.httpError', (response) => {
      const content = response.content;
      setTimeout(() => this.show(content.message));
    });
  }

  ngOnInit() {
    this.showNotification = 'hide';
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this.notificationListener !== undefined && this.notificationListener !== null) {
      this.eventManager.destroy(this.notificationListener);
    }
  }

  dismiss() {
    this.showNotification = 'hide';
    this.message = '';
    this.dismissed.next();
  }

  show(message) {
    this.showNotification = 'show';
    this.message = message;
    this.dismissed.next();
  }
}
