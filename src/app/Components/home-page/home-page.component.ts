import { Store } from '@ngrx/store';
import { WindowNames } from '../../../Types/TWindowNames';
import { IWindow, TWindowState } from '../../store/window/window.state';
import { Component, HostListener, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILanguageState } from '../../store/language/language.state';
import { toggleWindow } from '../../store/window/window.actions';
import { TextHomeWindow } from '../../../Interfaces/ITextHomeWindow';

@Component({
  selector: 'window-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private store: Store<{
      windowReducer: TWindowState;
      languageReducer: ILanguageState;
    }>
  ) {}

  window$:Observable<IWindow> = this.store.select('windowReducer').pipe(map((e) => e.homePage));
  language$:Observable<TextHomeWindow> = this.store
    .select('languageReducer')
    .pipe(map((e) => e.texts.homeWindow));

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 50) / 100,
    y: (window.innerHeight * 40) / 100,
  };

  ngOnInit() {
    this.window$.subscribe((res) => {
      console.log(res);
    });
  }

  timeoutResize: any;
  @HostListener('window:resize')
  resize() {
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.position = {
        x: (window.innerWidth * 50) / 100,
        y: (window.innerHeight * 40) / 100,
      };
    });
  }

  openWindow(windowName: WindowNames) {
    this.store.dispatch(
      toggleWindow({ windowName: windowName, setOpen: true })
    );
  }
}
