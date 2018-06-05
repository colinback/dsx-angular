import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';

import { CustomIconRegistry, SVG_ICONS } from 'app/shared/custom-icon-registry';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { NavItemComponent } from './layout/nav-item/nav-item.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectModule} from './modules/project/project.module';


export const svgIconProviders = [
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'keyboard_arrow_right',
      svgSource: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" ' +
                 'viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>'
    },
    multi: true
  },
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'menu',
      svgSource: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" ' +
                 'viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>'
    },
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NavMenuComponent,
    NavItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    // FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // ReactiveFormsModule
    ProjectModule,
    AppRoutingModule,
    ProjectModule
  ],
  providers: [
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    svgIconProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
