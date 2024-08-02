import { createAction, props } from '@ngrx/store';

export const changeVolume = createAction(
  '[Sound] Change Volume',
  props<{volume:number}>()
);
