import { WindowNames } from './../../../Types/TWindowNames';
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { toggleWindow } from '../../store/window/window.actions';
import { TWindowState } from '../../store/window/window.state';
import { ILanguageState, TLanguageOptions } from '../../store/language/language.state';
import { changeLanguage } from '../../store/language/language.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({
          transform: 'scale(0)',
          opacity: 0,
          transformOrigin: '25% 0',
        }),
        animate(
          '100ms linear',
          style({
            transform: 'scale(1)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'scale(1)',
          opacity: 1,
          transformOrigin: '25% 0',
        }),
        animate(
          '100ms linear',
          style({
            transform: 'scale(0)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  isSoundEnabled: boolean = true;
  languageOptionsIsOpen: boolean = false;
  timeChangeInterval: any;
  time: string = '';

  constructor(
    private store: Store<{
      windowReducer: TWindowState;
      languageReducer: ILanguageState;
    }>
  ) {}

  ngOnInit() {
    this.changeLanguage(this.languageName);
    this.timeChangeInterval = setInterval(() => {
      this.setTime(this.languageName);
    }, 1000);
  }

  setTime(language: TLanguageOptions) {
    this.time = new Intl.DateTimeFormat(
      language == 'portuguese' ? 'pt-BR' : 'en-IE',
      {
        weekday: 'short' as 'short',
        day: '2-digit' as '2-digit',
        month: 'short' as 'short',
        year: 'numeric' as 'numeric',
        hour: 'numeric' as 'numeric',
        minute: 'numeric' as 'numeric',
        hour12: false,
      }
    ).format(new Date());
  }

  isRegionPT() {
    return [
      'pt',
      'pt-AO',
      'pt-BR',
      'pt-CH',
      'pt-CV',
      'pt-GQ',
      'pt-GW',
      'pt-LU',
      'pt-MO',
      'pt-MZ',
      'pt-PT',
      'pt-ST',
      'pt-TL',
    ].includes(navigator.language);
  }

  ngOnDestroy() {
    clearInterval(this.timeChangeInterval);
  }

  language$ = this.store
    .select('languageReducer')
    .pipe(map((e) => e.texts.navbar));
  languageName: TLanguageOptions = this.isRegionPT() ? 'portuguese' : 'english';

  changeLanguage(language: TLanguageOptions) {
    this.store.dispatch(changeLanguage({ languageName: language }));
    this.languageName = language;
    this.setTime(language);
  }

  toggleLanguageOptionsIsOpen(bool: boolean) {
      setTimeout(() => {
        this.languageOptionsIsOpen = bool;
      });
  }

  openWindow(windowName: WindowNames) {
    this.store.dispatch(
      toggleWindow({ windowName: windowName, setOpen: true })
    );
  }
}
