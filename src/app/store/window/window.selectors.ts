import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TWindowState } from './window.state';

const getWindowState = createFeatureSelector<TWindowState>('window');
export const getWindow = createSelector(
  getWindowState,
  (state: TWindowState) => state
);
