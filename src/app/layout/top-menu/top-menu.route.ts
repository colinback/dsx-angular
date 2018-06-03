import { Route } from '@angular/router';

import { TopMenuComponent } from './top-menu.component';

export const topMenuRoute: Route = {
    path: '',
    component: TopMenuComponent,
    outlet: 'top-menu'
};
