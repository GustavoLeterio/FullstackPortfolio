import { WindowNames } from './../../../Types/TWindowNames';
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { toggleWindow } from '../../store/window/window.actions';
import { TWindowState } from '../../store/window/window.state';
import {
  ILanguageState,
  TLanguageOptions,
} from '../../store/language/language.state';
import { changeLanguage } from '../../store/language/language.actions';
import { map } from 'rxjs';
import { changeVolume } from '../../store/sound/sound.actions';
import { ISoundState } from '../../store/sound/sound.state';
import { IColorsState } from '../../store/colors/colors.state';
import { refreshToInitialValues } from '../../store/colors/colors.actions';
import { loadSlim } from '@tsparticles/slim';
import { NgParticlesService } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';

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
  languageOptionsIsOpen: boolean = false;
  timeChangeInterval: any;
  time: string = '';
  volumeRangeIsOpen: boolean = false;
  volume: number = 0;
  constructor(
    private store: Store<{
      windowReducer: TWindowState;
      languageReducer: ILanguageState;
      soundReducer: ISoundState;
      colorsReducer: IColorsState;
    }>,
    private readonly ngParticlesService: NgParticlesService
  ) {}

  ngOnInit() {
    this.sound$.subscribe((state) => {
      this.volume = state.volume;
    });
    this.dispatchLanguage(this.languageName);
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
  sound$ = this.store.select('soundReducer').pipe(map((e) => e));
  colors$ = this.store.select('colorsReducer').pipe(map((e) => e));
  languageName: TLanguageOptions = this.isRegionPT() ? 'portuguese' : 'english';

  dispatchLanguage(language: TLanguageOptions) {
    this.store.dispatch(changeLanguage({ languageName: language }));
    this.languageName = language;
    this.setTime(language);
  }

  toggleLanguageOptionsIsOpen(bool: boolean) {
    setTimeout(() => {
      this.languageOptionsIsOpen = bool;
    });
  }
  toggleVolumeRangeIsOpen(bool: boolean) {
    setTimeout(() => {
      this.volumeRangeIsOpen = bool;
    });
  }
  dispatchVolume() {
    this.store.dispatch(changeVolume({ volume: this.volume }));
  }

  openWindow(windowName: WindowNames) {
    this.store.dispatch(
      toggleWindow({ windowName: windowName, setOpen: true })
    );
  }
  toggleTheme() {
    var theme: 'Dark' | 'Light' | undefined;
    this.colors$.forEach((e) => {
      theme = e.theme == 'Dark' ? 'Light' : 'Dark';
    });
    this.store.dispatch(refreshToInitialValues({ theme }));
    this.ngParticlesService.init(async (engine: Engine) =>
      loadSlim(engine, true)
    );
  }
}
