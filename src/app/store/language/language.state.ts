import { TextLtrMusicPlayerWindow } from '../../../Interfaces/ILtrMusicPlayerWindow';
import { TextBiographBotWindow } from '../../../Interfaces/ITextBiographWindow';
import { TextCallMeBabyWindow } from '../../../Interfaces/ITextCallMeBabyWindow';
import { TextColorsWindow } from '../../../Interfaces/ITextColorsWindow';
import { TextHomeWindow } from '../../../Interfaces/ITextHomeWindow';
import { TextProjectronWindow } from '../../../Interfaces/ITextProjectronWindow';

export interface ILanguage {
  navbar: {
    home: String;
    about: String;
    projectsTechnologies: String;
    language: String;
  };
  homeWindow: TextHomeWindow;
  callMeBabyWindow: TextCallMeBabyWindow;
  ltrMusicPlayerWindow: TextLtrMusicPlayerWindow;
  projectronWindow: TextProjectronWindow;
  biographBotWindow: TextBiographBotWindow;
  colorsWindow: TextColorsWindow;
}

export type TLanguageOptions = "english"|"portuguese";

export type ILanguageState = {
  texts:ILanguage;
}

