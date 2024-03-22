import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISoundState } from './sound.state';

const getSoundFeature = createFeatureSelector<ISoundState>('sound');
export const getSoundState = createSelector(
  getSoundFeature,
  (state: ISoundState) => state
);
