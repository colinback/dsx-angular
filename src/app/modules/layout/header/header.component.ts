import { Component, Input, OnInit } from '@angular/core';
import { EventManager } from 'app/shared/event-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() links: any;
  @Input() palettes: any;

  constructor(private eventManager: EventManager) { }

  ngOnInit() {
  }

  toggle(palette: string) {
    this.eventManager.broadcast({name: 'dsxApp.header', content: palette});
  }
}
