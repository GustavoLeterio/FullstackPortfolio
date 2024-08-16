import { particlesSettings } from './../../../assets/particlesjs-config';
import { createReducer, on } from '@ngrx/store';
import { IColors } from './colors.state';
import { changeColor } from './colors.actions';

export const inicialState: IColors = {
  primary: '#ffc9c9',
  secondary: '#6361a1',
  font: 'black',
  particlesSettings: particlesSettings,
};

export const colorsReducer = createReducer(
  inicialState,
  on(changeColor, (state, action) => ({
    ...state,
    [Object.keys(action)[0]]: Object.values(action)[0],
    particlesSettings: {
      ...particlesSettings,
      particles: {
        ...particlesSettings.particles,
        color: {
          value:
            Object.keys(action)[0] != 'primary'
              ? (action.primary as string)
              : (state.primary as string),
          ...particlesSettings.particles?.color,
        },
        links: {
          color: {
            value:
              Object.keys(action)[0] != 'primary'
                ? (action.primary as string)
                : (state.primary as string),
          },
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: 0.4,
          width: 1,
          shadow: {
            blur: 5,
            color: {
              value:
                Object.keys(action)[0] != 'secondary'
                  ? (action.secondary as string)
                  : (state.secondary as string),
            },
            enable: false,
          },
        },
      },
    },
  }))
);
