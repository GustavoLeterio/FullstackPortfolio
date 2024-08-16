import { TextProjectronWindow } from '../../../Interfaces/ITextProjectronWindow';
import { WindowNames } from '../../../Types/TWindowNames';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'window-projectron',
  templateUrl: './projectron.component.html',
  styleUrl: './projectron.component.scss'
})
export class ProjectronComponent {
  @Input() isClosed: boolean = false;
  @Output() isClosedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    this.isClosed = true;
    this.isClosedChange.emit(this.isClosed);
  }
  @Output()windowOpen:EventEmitter<String> = new EventEmitter<String>();

  @Input({ required: true }) windowText: TextProjectronWindow = {
    windowName: '',
    title: '',
    presentation: '',
    curiosities: [],
    optionsTitleText: '',
    options: [],
  };

  ngOnInit() {
    console.log(this.windowText);
  }

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 50) / 100,
    y: (window.innerHeight * 50) / 100,
  };
}
