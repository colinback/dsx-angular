import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/shared/auth/user-route-access.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewFormComponent } from './project-new-form/project-new-form.component';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'projects/new',
    component: ProjectNewFormComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
