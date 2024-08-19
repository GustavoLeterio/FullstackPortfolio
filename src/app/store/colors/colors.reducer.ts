import { getParticlesSettings } from './../../../assets/particlesjs-config';
import { createReducer, on } from '@ngrx/store';
import { IColors } from './colors.state';
import { changeColor, refreshToInitialValues } from './colors.actions';

export const lightModeInicialState: IColors = {
  primary: '#ffc9c9',
  secondary: '#6361a1',
  font: 'black',
  particlesSettings: getParticlesSettings({
    primary: '#ffc9c9',
    secondary: '#6361a1',
  }),
  theme: 'Light',
};

export const darkModeInicialState: IColors = {
  primary: '#01081B',
  secondary: '#4400FF',
  font: 'white',
  particlesSettings: getParticlesSettings({
    primary: '#01081B',
    secondary: '#4400FF',
  }),
  theme: 'Dark',
};

export const colorsReducer = createReducer(
  lightModeInicialState,
  on(changeColor, (state, action) => {
    const newState:IColors = {
      ...state,
      ...action,
      particlesSettings: {
        ...state.particlesSettings,
        particles: {
          ...state.particlesSettings?.particles,
          color: {
            value:
              Object.keys(action)[0] == 'primary'
                ? (action.primary as string)
                : (state.primary as string),
            ...state.particlesSettings?.particles?.color,
          },
          links: {
            color: {
              value:
                Object.keys(action)[0] == 'primary'
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
                  Object.keys(action)[0] == 'secondary'
                    ? (action.secondary as string)
                    : (state.secondary as string),
              },
              enable: false,
            },
          },
        },
      },
    };
    const root = <HTMLElement>document.querySelector(':root');
    root.style.setProperty('--primary-color',newState.primary as string);
    root.style.setProperty('--secondary-color',newState.secondary as string);
    root.style.setProperty('--font-color',newState.font as string);
    return newState;
  }),
  on(refreshToInitialValues, (state, action) =>
    action.theme == 'Dark' ? darkModeInicialState : lightModeInicialState
  )
);
