import { createAction, props } from '@ngrx/store';

export const changePause = createAction(
  '[Sound] Toggle IsPaused',
  props<{isPaused:boolean}>()
);

export const changeVolume = createAction(
  '[Sound] Change Volume',
  props<{volume:number}>()
);
