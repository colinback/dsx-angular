import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/shared/auth/user-route-access.service';
import { CommunityListComponent } from './community-list/community-list.component';

export const communityRoutes: Routes = [
  {
    path: 'community',
    component: CommunityListComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
