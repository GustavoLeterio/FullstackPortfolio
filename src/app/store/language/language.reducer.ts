import { createReducer, on } from '@ngrx/store';
import { ILanguage, ILanguageState, TLanguageOptions } from './language.state';
import { changeLanguage } from './language.actions';

const languages: {
  [id in TLanguageOptions]: ILanguage;
} = {
  english: {
    navbar: {
      home: 'LeterioSystem2000',
      about: 'About Me',
      projectsTechnologies: 'Projects & Technologies',
      language: 'Language',
    },
    homeWindow: {
      windowName: 'Home Page',
      title: 'Full-Stack Developer',
      presentation:
        'Yeah, you just found what you were looking for: your brand-new, creative, dedicated, and most beautiful Full-Stack dev!',
      curiosities: [
        'Learning coding skills since 2018',
        'Higher Degree as a System’s Analyst and Developer',
        'Interested both in front and back',
        'Loves gym, music, coding, and self-improvement',
      ],
      optionsTitleText: 'You may find something cool here!',
      options: [
        { windowName: 'biographBot', text: 'About Me' },
        { windowName: 'projectron', text: 'Projects & Technologies' },
      ],
    },
    callMeBabyWindow: {
      windowName: 'Call Me Baby!',
      legend: "Don't be so shy, chat with me!",
    },
    ltrMusicPlayerWindow: {
      windowName: 'LTR Music Player',
      playing: 'Now Playing',
      paused: 'Paused...',
    },
    projectronWindow: {},
    biographBotWindow: {},
  },
  portuguese: {
    navbar: {
      home: 'LeterioSystem2000',
      about: 'Sobre Mim',
      projectsTechnologies: 'Tecnologias & Projetos',
      language: 'Linguagem',
    },
    homeWindow: {
      windowName: 'Página Inicial',
      title: 'Full-Stack Developer',
      presentation:
        'Sim, você acabou de achar o que estava procurando: seu mais novo, criativo, dedicado e mais lindo full-stack dev!',
      curiosities: [
        'Treinando programação desde 2018',
        'Formado em Análise e Desenvolvimento de Sistemas',
        'Interessado tanto em front quanto back',
        'Ama academia, música, código e desenvolvimento pessoal',
      ],
      optionsTitleText: 'Você vai achar algo legal aqui!',
      options: [
        { windowName: 'biographBot', text: 'Sobre Mim' },
        { windowName: 'projectron', text: 'Tecnologias & Projetos' },
      ],
    },
    callMeBabyWindow: {
      windowName: 'Call Me Baby!',
      legend: 'Não seja tão tímido, fala comigo!',
    },
    ltrMusicPlayerWindow: {
      windowName: 'LTR Music Player',
      playing: 'Tocando',
      paused: 'Pausado...',
    },
    projectronWindow: {},
    biographBotWindow: {},
  },
};

export const inicialState: ILanguageState = {
  texts: [
    'pt',
    'pt-AO',
    'pt-BR',
    'pt-CH',
    'pt-CV',
    'pt-GQ',
    'pt-GW',
    'pt-LU',
    'pt-MO',
    'pt-MZ',
    'pt-PT',
    'pt-ST',
    'pt-TL',
  ].includes(navigator.language)
    ? languages.portuguese
    : languages.english,
};

export const languageReducer = createReducer(
  inicialState,
  on(changeLanguage, (state, action) => ({
    ...state,
    texts: languages[action.languageName],
  }))
);
