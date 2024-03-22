import { TextBiographBotWindow } from '../../../Interfaces/ITextBiographWindow';
import { WindowNames } from '../../../Types/TWindowNames';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'window-biograph-bot',
  templateUrl: './biograph-bot.component.html',
  styleUrl: './biograph-bot.component.scss',
})
export class BiographBotComponent {
  @Input() isClosed: boolean = false;
  @Output() isClosedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input({ required: true }) isWindowClosed: {
    [id in WindowNames]: boolean;
  } = {
    callMeBaby: true,
    homePage: true,
    ltrMusicPlayer: true,
    projectron: false,
    biographBot: false,
  };
  close() {
    this.isClosed = true;
    this.isClosedChange.emit(this.isClosed);
  }
  @Output() windowOpen: EventEmitter<String> = new EventEmitter<String>();

  @Input({ required: true }) windowText: TextBiographBotWindow = {
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
