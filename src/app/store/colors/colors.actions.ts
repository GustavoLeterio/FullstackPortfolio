import { createAction, props } from '@ngrx/store';
import { IColorsState } from './colors.state';

export const changeColor = createAction(
  '[Colors] Change Color',
  props<IColorsState>()
);
export const resetParticlesColors = createAction(
  '[Colors] Change Color',
  props<IColorsState>()
);
