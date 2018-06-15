import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit {

  headlinks = [
    {
      name: 'Community',
      url: '/community'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
