import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TWindowState } from './store/window/window.state';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';

  constructor(private store:Store<{windowReducer:TWindowState}>){}

  windows$ = this.store.select('windowReducer').pipe(map(e=>e));
}
