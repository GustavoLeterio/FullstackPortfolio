import { loadSlim } from '@tsparticles/slim';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ILanguageState } from '../../store/language/language.state';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { NgParticlesService } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import {
  changeColor,
  refreshToInitialValues,
} from '../../store/colors/colors.actions';
import { IColors, IColorsState } from '../../store/colors/colors.state';
import {
  lightModeInicialState,
  darkModeInicialState,
} from '../../store/colors/colors.reducer';

@Component({
  selector: 'window-colors',
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
})
export class ColorsComponent {
  @Output() windowOpen: EventEmitter<String> = new EventEmitter<String>();
  constructor(
    private store: Store<{
      languageReducer: ILanguageState;
      colorsReducer: IColorsState;
    }>,
    private readonly ngParticlesService: NgParticlesService
  ) {}
  language$ = this.store
    .select('languageReducer')
    .pipe(map((e) => e.texts.colorsWindow));

  colors$: Observable<IColors> = this.store
    .select('colorsReducer')
    .pipe(map((e) => e));

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 15) / 100,
    y: (window.innerHeight * 80) / 100,
  };

  timeoutResize: any;
  @HostListener('window:resize')
  resize() {
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.position = {
        x: (window.innerWidth * 15) / 100,
        y: (window.innerHeight * 80) / 100,
      };
    });
  }
  changeColor(e: any, prop: 'primary' | 'secondary' | 'font') {
    this.store.dispatch(
      changeColor({
        [prop]: e.target.value,
      })
    );
  }

  resetColors(toggleTheme: boolean = false) {
    var theme: 'Dark' | 'Light' | undefined;
    this.colors$.forEach((e) => {
      theme = toggleTheme ? (e.theme == 'Dark' ? 'Light' : 'Dark') : e.theme;
    });
    this.store.dispatch(refreshToInitialValues({ theme }));
  }

  resetParticles() {
    this.ngParticlesService.init(async (engine: Engine) =>
      loadSlim(engine, true)
    );
  }
}
