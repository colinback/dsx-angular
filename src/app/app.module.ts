import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';

import { CustomIconRegistry, SVG_ICONS } from 'app/shared/custom-icon-registry';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectModule} from './modules/project/project.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';

import { EventManager } from './shared/event-manager.service';
import { NotificationComponent } from './layout/notification/notification.component';
import { ErrorHandlerInterceptor } from './shared/interceptor/errorhandler.interceptor';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './shared/interceptor/auth-expired.interceptor';

import { LoginService } from './shared/login.service';
import { CSRFService } from './shared/auth/csrf.service';
import { Principal } from './shared/auth/principal.service';
import { AuthServerProvider } from './shared/auth/auth-jwt.service';
import { AccountService } from './shared/auth/account.service';
import { StateStorageService } from './shared/auth/state-storage.service';
import { UserRouteAccessService } from './shared/auth/user-route-access.service';
import { HasAnyAuthorityDirective } from './shared/auth/has-any-authority.directive';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryApiService } from './in-memory-api.service';

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
  },
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'insert_comment',
      svgSource:
      '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>' +
        '<path d="M0 0h24v24H0z" fill="none"/>' +
      '</svg>'
    },
    multi: true
  }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export class MissingTranslation implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return 'missing';
    }
}

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NavMenuComponent,
    FooterComponent,
    NotificationComponent,
    HasAnyAuthorityDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CdkTableModule,
    Ng2Webstorage.forRoot({ prefix: 'dsx', separator: '-'}),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryApiService, { passThruUnknownUrl: true, dataEncapsulation: false }
    ),
    // FormsModule,
    // ReactiveFormsModule
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ProjectModule,
    // i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslation
      }
    })
  ],
  providers: [
    AccountService,
    AuthServerProvider,
    Principal,
    StateStorageService,
    LoginService,
    LocalStorageService,
    SessionStorageService,
    CSRFService,
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    svgIconProviders,
    EventManager,
    UserRouteAccessService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [
        LocalStorageService,
        SessionStorageService
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [
        Injector
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      deps: [
        EventManager
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
