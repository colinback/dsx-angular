// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';

// local/session storage
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';

// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

// shared service
import { CustomIconRegistry, SVG_ICONS } from 'app/shared/custom-icon-registry';
import { EventManager } from './shared/event-manager.service';
import { ErrorHandlerInterceptor } from './shared/interceptor/errorhandler.interceptor';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './shared/interceptor/auth-expired.interceptor';
import { LoginService } from './shared/login.service';
import { LoggerService } from './shared/logger.service';
import { CSRFService } from './shared/auth/csrf.service';
import { Principal } from './shared/auth/principal.service';
import { AuthServerProvider } from './shared/auth/auth-jwt.service';
import { AccountService } from './shared/auth/account.service';
import { StateStorageService } from './shared/auth/state-storage.service';
import { UserRouteAccessService } from './shared/auth/user-route-access.service';

// api mock
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryApiService } from './in-memory-api.service';

import { AppRoutingModule } from './app-routing.module';
import { ProjectModule} from './modules/project/project.module';
import { LayoutModule } from './modules/layout/layout.module';
import { MainComponent } from './modules/layout/main/main.component';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    Ng2Webstorage.forRoot({ prefix: 'dsx', separator: '-'}),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryApiService, { passThruUnknownUrl: true, dataEncapsulation: false }
    ),
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
    }),
    ProjectModule,
    LayoutModule
  ],
  providers: [
    AccountService,
    AuthServerProvider,
    Principal,
    StateStorageService,
    LoginService,
    LoggerService,
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
  bootstrap: [MainComponent]
})
export class AppModule { }
