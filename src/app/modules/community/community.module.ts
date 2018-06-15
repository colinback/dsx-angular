// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ngx-translate
import { TranslateModule } from '@ngx-translate/core';

import { communityRoutes } from './community.route';
import { CommunityListComponent } from './community-list/community-list.component';
import { LayoutModule } from 'app/modules/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(communityRoutes),
    TranslateModule.forChild()
  ],
  declarations: [
    CommunityListComponent
  ]
})
export class CommunityModule { }
