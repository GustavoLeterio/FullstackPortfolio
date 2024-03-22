import { Store } from '@ngrx/store';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ILanguageState } from '../../store/language/language.state';
import { map } from 'rxjs';

@Component({
  selector: 'window-call-me-baby',
  templateUrl: './call-me-baby.component.html',
  styleUrl: './call-me-baby.component.scss',
})
export class CallMeBabyComponent {
  @Output() windowOpen: EventEmitter<String> = new EventEmitter<String>();

  constructor(private store:Store<{languageReducer:ILanguageState}>){}

  language$ = this.store
  .select('languageReducer')
  .pipe(map((e) => e.texts.callMeBabyWindow));

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 82) / 100,
    y: (window.innerHeight * 82) / 100,
  };

  timeoutResize: any;
  @HostListener('window:resize')
  resize() {
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.position = {
        x: (window.innerWidth * 82) / 100,
        y: (window.innerHeight * 82) / 100,
      };
    });
  }
}
