import { WindowNames } from '../../../Types/TWindowNames';

export interface IWindow{
  zIndex:number;
  open:boolean;
}

export type TWindowState = {
  [id in WindowNames]:IWindow;
}

