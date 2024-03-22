import { createAction, props } from '@ngrx/store';
import { TLanguageOptions } from './language.state';

export const changeLanguage = createAction(
  '[Language] Change Language',
  props<{languageName: TLanguageOptions }>()
);
