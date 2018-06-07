import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectRoutes } from './project.route';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewFormComponent } from './project-new-form/project-new-form.component';

import { ProjectService } from './project.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryProjectService } from './in-memory-project.service';

import { LoggerService } from 'app/shared/logger.service';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryProjectService, { passThruUnknownUrl: true, dataEncapsulation: false }
    ),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forChild(projectRoutes),
    // i18n
    TranslateModule.forChild()
  ],
  declarations: [
    ProjectListComponent,
    ProjectNewFormComponent
  ],
  providers: [
    ProjectService,
    LoggerService
  ]
})
export class ProjectModule { }
