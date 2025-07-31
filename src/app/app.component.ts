import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './i18n';
// language list
import { locale as chLang } from './i18n/vocabs/ch';
import { locale as deLang } from './i18n/vocabs/de';
import { locale as enLang } from './i18n/vocabs/en';
import { locale as esLang } from './i18n/vocabs/es';
import { locale as frLang } from './i18n/vocabs/fr';
import { locale as jpLang } from './i18n/vocabs/jp';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {}
}
