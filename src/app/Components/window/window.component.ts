import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({
          transform: "scale(0.4) translate(-50%,-40%)",
          opacity: 0,
          transformOrigin: '0 100%'
        }),
        animate(
          '300ms linear',
          style({
            transform: "scale(1) translate(-50%,-50%)",
            opacity: .3,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: "scale(1) translate(-50%,-50%)",
          opacity: 1,
          transformOrigin: '0 100%'
        }),
        animate(
          '300ms linear',
          style({
            transform: "scale(0.4) translate(-50%,-40%)",
            opacity: .3,
          })
        ),
      ]),
    ]),
  ],
})
export class WindowComponent {
  @Input({ required: true }) title: String = 'Program Name';

  @Input({ required: true }) position: { x: number; y: number } = { x: 100, y: 100 };

  @Input() isClosed: boolean = false;
  @Input() closable: boolean = true;

  @Output() closeEvent: EventEmitter<null> = new EventEmitter();

  @ViewChild('wrapper') wrapperRef!: ElementRef;

  @ViewChild('topBar') topBarRef!: ElementRef;


  constructor(@Inject(DOCUMENT) private _document: Document) { }

  close() {
    this.isClosed = true;
    setTimeout(() => {
      this.closeEvent.emit();
    }, 500);
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
