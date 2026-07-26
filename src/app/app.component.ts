import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TWindowState } from './store/window/window.state';
import { map } from 'rxjs';
import { NgParticlesService, NgxParticlesComponent } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { WindowNames } from '../Types/TWindowNames';
import { IColorsState } from './store/colors/colors.state';

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

 

  ngAfterViewInit(): void {
    alert("Website currently under development...")
    const root = <HTMLElement>document.querySelector(':root');
    this.colors$.forEach((e) => {
      console.log(e);
      Object.keys(e).forEach((prop, i) => {
        root.style.setProperty(`--${prop}-color`, Object.values(e)[i]);
      });
    });

    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine,true);
    });

 
  }
}
