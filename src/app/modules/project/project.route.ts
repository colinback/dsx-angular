import { Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewFormComponent } from './project-new-form/project-new-form.component';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/new',
    component: ProjectNewFormComponent
  }
];
