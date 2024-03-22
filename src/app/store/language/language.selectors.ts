import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILanguageState } from './language.state';

const getLanguageFeature = createFeatureSelector<ILanguageState>('language');
export const getLanguageState = createSelector(
  getLanguageFeature,
  (state: ILanguageState) => state
);
