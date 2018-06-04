import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  nodes = [
    {
      "url" : "/community",
      "title": "community",
      "tooltip": "community page"
    }, {
      "title": "projects",
      "tooltip": "projects page"
    }, {
      "title": "dashboard",
      "tooltip": "dashboard page"
    },
    {
      "url" : "/mlaas",
      "title": "model managment",
      "tooltip": "model managment page"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
