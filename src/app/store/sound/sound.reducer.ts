import { createReducer, on } from '@ngrx/store';
import { changePause, changeVolume } from './sound.actions';
import { ISoundState } from './sound.state';

export const inicialState: ISoundState = {
  isPaused:false,
  volume: .2,
};

export const soundReducer = createReducer(
  inicialState,
  on(changePause, (state,action) => ({
    ...state,
    isPaused: action.isPaused,
  })),
  on(changeVolume, (state,action) => ({
    ...state,
    volume: action.volume,
  })),
);
