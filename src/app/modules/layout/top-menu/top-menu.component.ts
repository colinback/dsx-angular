import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from 'app/shared/logger.service';
import { LoginService } from 'app/shared/login.service';
import { StateStorageService } from 'app/shared/auth/state-storage.service';
import { Principal } from 'app/shared/auth/principal.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  currentLang = 'en';

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private stateStorageService: StateStorageService,
    private translate: TranslateService,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() { }

  changeLanguage(languageKey: string) {
    if (this.currentLang !== languageKey) {
      this.translate.use(languageKey);
      this.currentLang = languageKey;
      this.logger.log('current language:', this.currentLang);
    }
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.loginService.login({}).then(() => {
      // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
      // // since login is succesful, go to stored previousState and clear previousState
      const redirect = this.stateStorageService.getUrl();
      if (redirect) {
        this.stateStorageService.storeUrl(null);
        this.router.navigate([redirect]);
      }
    }).catch(() => {
      // TODO
      // this.authenticationError = true;
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
