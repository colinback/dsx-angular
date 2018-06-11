import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/shared/auth/user-route-access.service';
import { TopMenuComponent } from './top-menu.component';

export const topMenuRoute: Route = {
    path: '',
    component: TopMenuComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    outlet: 'top-menu'
};
