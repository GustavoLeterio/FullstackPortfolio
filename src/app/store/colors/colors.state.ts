import { ISourceOptions } from '@tsparticles/engine';

export interface IColors {
    primary?:String;
    secondary?:String;
    font?:"white"|"black";
    particlesSettings?:ISourceOptions;
}

export type IColorsState = IColors;
