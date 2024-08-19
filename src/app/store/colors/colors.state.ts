import { ISourceOptions } from '@tsparticles/engine';

export interface IColors {
  primary?: string;
  secondary?: string;
  font?: 'white' | 'black';
  particlesSettings?: ISourceOptions;
  theme?: 'Dark' | 'Light';
}

export type IColorsState = IColors;
