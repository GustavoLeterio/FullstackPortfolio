import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Input,
} from '@angular/core';
import { focusWindow, toggleWindow } from '../../store/window/window.actions';
import { WindowNames } from '../../../Types/TWindowNames';
import { map } from 'rxjs';
import { TWindowState } from '../../store/window/window.state';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({
          transform: 'scale(0.4) translate(-50%,-40%)',
          opacity: 0,
          transformOrigin: '0 100%',
        }),
        animate(
          '300ms linear',
          style({
            transform: 'scale(1) translate(-50%,-50%)',
            opacity: 0.3,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'scale(1) translate(-50%,-50%)',
          opacity: 1,
          transformOrigin: '0 100%',
        }),
        animate(
          '300ms linear',
          style({
            transform: 'scale(0.4) translate(-50%,-40%)',
            opacity: 0.3,
          })
        ),
      ]),
    ]),
  ],
})
export class WindowComponent {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private store: Store<{ windowReducer: TWindowState }>
  ) {}

  @Input({ required: true }) title: String = 'Program Name';

  @Input({ required: true }) position: { x: number; y: number } = {
    x: 100,
    y: 100,
  };

  @Input() closable: boolean = true;
  @Input({ required: true }) windowName: WindowNames = 'biographBot';

  window$ = this.store.select('windowReducer').pipe(map(e=>e[this.windowName]));

  focus(){
    this.store.dispatch(
      focusWindow({ windowName: this.windowName})
    );
  }

  close() {
    this.store.dispatch(
      toggleWindow({ windowName: this.windowName, setOpen: false })
    );
  }


  startDrag(e: any): void {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e: any) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;

      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
    };

    const finishDrag = () => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }
}
