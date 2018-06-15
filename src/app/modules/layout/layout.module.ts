// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// ngx-translate
import { TranslateModule} from '@ngx-translate/core';

// layout component
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotificationComponent } from './notification/notification.component';
import { PaletteDirective, PaletteComponent } from './palette/palette.component';
import { PaletteInfoComponent } from './palette/palette-info.component';
import { PaletteConnectionComponent } from './palette/palette-connection.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

// shared directive
import { HasAnyAuthorityDirective } from 'app/shared/auth/has-any-authority.directive';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule.forChild()
  ],
  declarations: [
    HasAnyAuthorityDirective,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    NavMenuComponent,
    NotificationComponent,
    TopMenuComponent,
    PaletteDirective,
    PaletteComponent,
    PaletteInfoComponent,
    PaletteConnectionComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    // layout component
    HeaderComponent,
    MainComponent,
    PaletteDirective,
    PaletteComponent,
    PaletteInfoComponent,
    PaletteConnectionComponent
  ]
})
export class LayoutModule { }
