import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppAuthService, UserModel } from 'src/app/auth';
import { SubSink } from 'subsink';
import { TranslationService } from '../../../../../../i18n';
import { PostingDto } from '../../../../../../proxy/dto-models';
import { Common } from '../../../../../../shared/common/common';
import { IdToken } from '../../../../../../shared/model/project-model';
import { LocalStorageService } from '../../../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<UserModel>;
  langs = languages;
  subs = new SubSink();
  name: string;
  post: string;
  office: string;
  email: string;
  employeeId: number = 0;

  constructor(
    private authService: AppAuthService,
    private translationService: TranslationService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
    var userStorage = JSON.parse(localStorage.getItem("posting")) as PostingDto;
    let token = JSON.parse(localStorage.getItem("id_token_claims_obj")) as IdToken;
    if (userStorage?.employeeId > 0) {
      this.name = userStorage.name;
      this.post = userStorage.post;
      this.office = userStorage.office;
      this.employeeId = userStorage.employeeId;
      this.email = token.email;
    }
    else {
      this.user$.subscribe((u: UserModel) => {
        if (u.name)
          this.name = u.name;
        else
          this.name = token.name;
      })
    }
  }
  changePass() {
    window.location.href = "https://auth.mis1pwd.com/Account/Manage";
  }


  logout() {
    this.authService.logout();
    this.localStorageService.remove(Common.PermissionCacheKey);
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
