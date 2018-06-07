import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from 'app/shared/logger.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  currentLang = 'en';

  constructor(private translate: TranslateService, private logger: LoggerService) { }

  ngOnInit() {
  }

  changeLanguage(languageKey: string) {
    if (this.currentLang !== languageKey) {
      this.translate.use(languageKey);
      this.currentLang = languageKey;
      this.logger.log('current language:', this.currentLang);
    }
  }
}
