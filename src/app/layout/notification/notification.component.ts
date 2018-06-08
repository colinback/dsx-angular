import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { animate, state, style, trigger, transition } from '@angular/animations';

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
      transition('show => hide', animate(250))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @Input() icon: string;
  @Input() iconLabel: string;

  @Output() dismissed = new EventEmitter();

  @HostBinding('@hideAnimation')
  showNotification: 'show'|'hide';

  constructor() { }

  ngOnInit() {
    this.showNotification = 'show';
  }

  dismiss() {
    this.showNotification = 'hide';
    this.dismissed.next();
  }
}
