import { Component, Input } from '@angular/core';
import { WindowNames } from '../../../Types/TWindowNames';
import { toggleWindow } from '../../store/window/window.actions';
import { TWindowState } from '../../store/window/window.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input({required:true}) text:String = "";
  @Input({required:true}) src:String = "";
  @Input({required:true}) windowName:WindowNames = "homePage";

  constructor(
    private store: Store<{
      windowReducer: TWindowState;
    }>
  ) {}


  openWindow() {
    this.store.dispatch(
      toggleWindow({ windowName: this.windowName, setOpen: true })
    );
  }
}
