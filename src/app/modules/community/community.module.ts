import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { communityRoutes } from './community.route';
import { CommunityListComponent } from './community-list/community-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(communityRoutes),
  ],
  declarations: [
    CommunityListComponent
  ]
})
export class CommunityModule { }
