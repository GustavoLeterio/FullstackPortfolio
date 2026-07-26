import { Component } from '@angular/core';
import { WindowNames } from '../../../Types/TWindowNames';

@Component({
  selector: 'app-desktop-icon-handler',
  templateUrl: './desktop-icon-handler.component.html',
  styleUrl: './desktop-icon-handler.component.scss'
})
export class DesktopIconHandlerComponent {
  desktopIconHandler: {
    windowName: WindowNames;
    src: String;
    text: String;
  }[][] = [];
  draggingCoordenates: { i: number; j: number } = { i: 0, j: 0 };
  ngAfterViewInit(): void {
    //inicializing desktopIconsContainer
    for (var i = 0; i < 6; i++) {
      this.desktopIconHandler.push([]);
      for (var j = 0; j < 10; j++) {
        this.desktopIconHandler[i].push({
          windowName: 'homePage',
          src: '',
          text: '',
        });
      }
    }
    this.desktopIconHandler[0][0] = {
      windowName: 'homePage',
      src: '../assets/images/icon_home.png',
      text: 'Home',
    };
    this.desktopIconHandler[1][0] = {
      windowName: 'colors',
      src: '../assets/images/icon_colors.png',
      text: 'Colors',
    };
    this.desktopIconHandler[2][0] = {
      windowName: 'ltrMusicPlayer',
      src: '../assets/images/icon_music.png',
      text: 'LTR Music Player',
    };
  }
  
    drag(e: any) {
      var coordenates = e.target
        .closest('.table_cell')
        .attributes['id'].nodeValue.split(',');
      this.draggingCoordenates = { i: coordenates[0], j: coordenates[1] };
    }

    drop(e: any) {
      var coordenates = e.target
        .closest('.table_cell')
        .attributes['id'].nodeValue.split(',');

      var dropIcon = this.desktopIconHandler[coordenates[0]][coordenates[1]];
      var droppedIcon =
        this.desktopIconHandler[this.draggingCoordenates.i][
        this.draggingCoordenates.j
        ];

      if (dropIcon.src != '') {
        this.desktopIconHandler[this.draggingCoordenates.i][
          this.draggingCoordenates.j
        ] = dropIcon;
        this.desktopIconHandler[coordenates[0]][coordenates[1]] = droppedIcon;
      } else {
        this.desktopIconHandler[this.draggingCoordenates.i][
          this.draggingCoordenates.j
        ] = { windowName: 'homePage', src: '', text: '' };
        this.desktopIconHandler[coordenates[0]][coordenates[1]] = droppedIcon;
      }
    }
    allowDrop(e: any) {
      e.preventDefault();
    }
  }
