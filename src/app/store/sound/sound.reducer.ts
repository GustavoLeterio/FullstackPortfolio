import { createReducer, on } from '@ngrx/store';
import { changeVolume } from './sound.actions';
import { ISoundState } from './sound.state';

export const inicialState: ISoundState = {
  volume: 10,
};

export const soundReducer = createReducer(
  inicialState,
  on(changeVolume, (state,action) => ({
    ...state,
    volume: action.volume,
  })),
);
