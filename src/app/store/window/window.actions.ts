import { createAction, props } from '@ngrx/store';
import { WindowNames } from '../../../Types/TWindowNames';

export const toggleWindow = createAction(
  '[Window] Toggle Window',
  props<{ windowName: WindowNames; setOpen: boolean }>()
);

export const focusWindow = createAction(
  '[Window] Focus Window',
  props<{ windowName: WindowNames}>()
);
