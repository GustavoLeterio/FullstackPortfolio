import { createReducer, on } from '@ngrx/store';
import { IWindow, TWindowState } from './window.state';
import { focusWindow, toggleWindow } from './window.actions';

export const inicialState: TWindowState = {
  biographBot: { open: false, zIndex: 0 },
  callMeBaby: { open: true, zIndex: 1 },
  homePage: { open: true, zIndex: 0 },
  ltrMusicPlayer: { open: true, zIndex: 1 },
  colors: { open: false, zIndex: 2 },
  projectron: { open: true, zIndex: 5 },
};

export const windowReducer = createReducer(
  inicialState,
  on(toggleWindow, (state, action) => ({
    ...state,
    [action.windowName]: {
      ...state[action.windowName],
      open: action.setOpen,
      zIndex: Math.max(...Object.values(state).map(a => a.zIndex)) + 1
    },
  })),
  on(focusWindow, (state, action) => ({
    ...state,
    [action.windowName]: {
      ...state[action.windowName],
      zIndex: Math.max(...Object.values(state).map(a => a.zIndex)) + 1
    }
  }))
);
