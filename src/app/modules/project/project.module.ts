// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ngx-translate
import { TranslateModule } from '@ngx-translate/core';

// project component
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewFormComponent } from './project-new-form/project-new-form.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

// layout palette component
import { PaletteInfoComponent } from 'app/modules/layout/palette/palette-info.component';
import { PaletteConnectionComponent } from 'app/modules/layout/palette/palette-connection.component';

import { ProjectService } from './project.service';
import { projectRoutes } from './project.route';
import { LayoutModule } from 'app/modules/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(projectRoutes),
    // i18n
    TranslateModule.forChild()
  ],
  declarations: [
    ProjectListComponent,
    ProjectNewFormComponent,
    ConfirmDialogComponent,
    ProjectOverviewComponent
  ],
  providers: [
    ProjectService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    PaletteInfoComponent,
    PaletteConnectionComponent
  ]
})
export class ProjectModule { }
