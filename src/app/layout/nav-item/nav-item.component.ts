import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnChanges {
  @Input() node: Object;

  ngOnChanges() {
  }
}
