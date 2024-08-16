import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColorsState } from './colors.state';

const getColorsFeature = createFeatureSelector<IColorsState>('colors');
export const getColorsState = createSelector(
  getColorsFeature,
  (state: IColorsState) => state
);
