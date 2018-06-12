import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectRoutes } from './project.route';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewFormComponent } from './project-new-form/project-new-form.component';

import { ProjectService } from './project.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LoggerService } from 'app/shared/logger.service';

import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from 'app/layout/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
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
    ProjectNewFormComponent,
    ConfirmDialogComponent,
    HeaderComponent
  ],
  providers: [
    ProjectService,
    LoggerService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class ProjectModule { }
