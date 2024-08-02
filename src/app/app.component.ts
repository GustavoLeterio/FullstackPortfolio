import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TWindowState } from './store/window/window.state';
import { map } from 'rxjs';
import { particlesSettings } from '../assets/particlesjs-config';
import { NgParticlesService } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import configs from '@tsparticles/configs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
  particlesSettings = particlesSettings;
  constructor(
    private store: Store<{ windowReducer: TWindowState }>,
    private readonly ngParticlesService: NgParticlesService
  ) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  windows$ = this.store.select('windowReducer').pipe(map((e) => e));
}
