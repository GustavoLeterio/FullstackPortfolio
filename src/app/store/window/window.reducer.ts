import { createReducer, on } from '@ngrx/store';
import { IWindow, TWindowState } from './window.state';
import { focusWindow, toggleWindow } from './window.actions';

export const inicialState: TWindowState = {
  biographBot: { open: false, zIndex: 0 },
  callMeBaby: { open: true, zIndex: 1 },
  homePage: { open: true, zIndex: 0 },
  ltrMusicPlayer: { open: true, zIndex: 1 },
  colors: { open: true, zIndex: 2 },
  projectron: { open: false, zIndex: 0 },
};

export const windowReducer = createReducer(
  inicialState,
  on(toggleWindow, (state, action) => ({
    ...state,
    [action.windowName]: { ...state[action.windowName], open: action.setOpen },
  })),
  on(focusWindow, (state, action) => {
    var stateMirror = state;
    Object.values(state).forEach((window) => {
      stateMirror = {
        ...stateMirror,
        [action.windowName]: {
          ...stateMirror[action.windowName],
          zIndex:
            window.zIndex >= stateMirror[action.windowName].zIndex
              ? window.zIndex
              : stateMirror[action.windowName].zIndex + 1,
        },
      };
    });
    return stateMirror;
  })
);
