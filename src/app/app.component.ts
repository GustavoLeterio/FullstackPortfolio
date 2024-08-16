import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TWindowState } from './store/window/window.state';
import { map } from 'rxjs';
import { particlesSettings } from '../assets/particlesjs-config';
import { NgParticlesService, NgxParticlesComponent } from '@tsparticles/angular';
import { Engine, SingleOrMultiple } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { WindowNames } from '../Types/TWindowNames';
import { IColors, IColorsState } from './store/colors/colors.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
  @ViewChild(NgxParticlesComponent) particlesCmp: NgxParticlesComponent | undefined;
  constructor(
    private store: Store<{
      windowReducer: TWindowState;
      colorsReducer: IColorsState;
    }>,
    private readonly ngParticlesService: NgParticlesService
  ) {}

  windows$ = this.store.select('windowReducer').pipe(map((e) => e));
  colors$ = this.store.select('colorsReducer').pipe(map((e) => e));

  desktopIconHandler: {
    windowName: WindowNames;
    src: String;
    text: String;
  }[][] = [];
  draggingCoordenates: { i: number; j: number } = { i: 0, j: 0 };

  ngAfterViewInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine,true);
    });

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
      windowName: 'homePage',
      src: '../assets/images/icon_home.png',
      text: 'teste',
    };
  }

  allowDrop(e: any) {
    e.preventDefault();
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

    // If slot already taken, toggle both, else just move the icon and empty the previous slot
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
}
