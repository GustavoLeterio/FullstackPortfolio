import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
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
          width: '1px',
          height: '1px',
          transform: 'translate(-50%,100%)',
          opacity: 0,
          transformOrigin:"bottom-left"
        }),
        animate(
          '500ms ease-in',
          style({
            width: 'auto',
            height: 'auto',
            transform: 'translate(0px,0px)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1000ms', style({ opacity: 0.9, offset: 0 })),
      ]),
    ]),
  ],
})
export class WindowComponent {
  @Input({ required: true }) title: String = 'Program Name';
  @Input({ required: true }) windowSize: { width: String; height: String } = {
    width: '320px',
    height: '320px',
  };
  @Input() isClosed: boolean = false;
  @Input() closable: boolean = true;

  @Output() closeEvent: EventEmitter<null> = new EventEmitter();

  @ViewChild('wrapper') wrapperRef!: ElementRef;

  @ViewChild('topBar') topBarRef!: ElementRef;

  position: { x: number; y: number } = { x: 100, y: 100 };

  lastPosition: { x: number; y: number } = { x: 100, y: 100 };

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  close() {
    this.isClosed = true;
    setTimeout(() => {
      this.closeEvent.emit();
    }, 350);
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
      this.lastPosition = { ...this.position };
    };

    const finishDrag = () => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }
}
