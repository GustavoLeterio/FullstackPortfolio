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
      paused: 'Paused',
      loading: 'Loading...',
    },
    colorsWindow: {
      windowName: 'Colors',
      title: 'Give it your personal touch!',
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      light: 'White Font',
      dark: 'Black Font',
    },
    projectronWindow: {
      windowName: 'Projectron',
      title: 'Projetos & ecnologias',
      subtitle: 'Pesquise um pouco em meus conhecimentos:',
      technologies: {
        backend: [
          { category: 'Frontend', name: 'Javascript', timeStudied: new Date('2018-01-01'), description: 'JavaScript é uma linguagem de programação geralmente usada para desenvolvimento web, permitindo interatividade em páginas da web.' },
          { category: 'Frontend', name: 'Angular', timeStudied: new Date('2020-01-01'), description: 'Angular é um framework para aplicações web desenvolvido pelo Google. É utilizado para construir aplicações de página única e é baseado em TypeScript.' },
          { category: 'Frontend', name: 'React', timeStudied: new Date('2020-01-01'), description: 'React é uma biblioteca JavaScript para construção de interfaces de usuário. É mantida pelo Facebook e amplamente utilizada para criar aplicações de página única.' },
          { category: 'Frontend', name: 'React Native', timeStudied: new Date('2020-01-01'), description: 'React Native é um framework para desenvolvimento de aplicações móveis utilizando React. Ele permite criar apps nativos para iOS e Android usando JavaScript e React.' },
          { category: 'Frontend', name: 'Next', timeStudied: new Date('2020-01-01'), description: 'Next.js é um framework React que permite renderização do lado do servidor e geração de sites estáticos. É utilizado para construir aplicações web rápidas e otimizadas.' },
          { category: 'Frontend', name: 'Typescript', timeStudied: new Date('2020-01-01'), description: 'TypeScript é um superconjunto do JavaScript que adiciona tipagem estática à linguagem. É desenvolvido e mantido pela Microsoft e amplamente usado em aplicações em larga escala.' },
        ],
        frontend: [
          { category: 'Backend', name: 'Java', timeStudied: new Date('2018-01-01'), description: 'Java é uma linguagem de programação de alto nível, baseada em classes e orientada a objetos, projetada para ter o mínimo de dependências de implementação. É amplamente usada no desenvolvimento de aplicações corporativas.' },
          { category: 'Backend', name: 'Spring', timeStudied: new Date('2018-01-01'), description: 'Spring é um framework para desenvolvimento de aplicações em Java. Ele oferece um modelo abrangente de programação e configuração para aplicações corporativas modernas baseadas em Java.' },
          { category: 'Backend', name: 'SQL', timeStudied: new Date('2018-01-01'), description: 'SQL (Structured Query Language) é uma linguagem padrão para gerenciamento e manipulação de bancos de dados. É usada para consultar, atualizar e gerenciar dados em sistemas de gerenciamento de bancos de dados relacionais.' },
          { category: 'Backend', name: 'PostgreSQL', timeStudied: new Date('2018-01-01'), description: 'PostgreSQL é um sistema de banco de dados objeto-relacional poderoso e de código aberto. É conhecido por sua confiabilidade, robustez de recursos e desempenho.' }

        ],
      },
      projectListTitle: 'Projetos recentes:',
      timeStudied: 'Tempo de estudo - X Anos',
      projects: [
        {
          name: 'Project 1',
          description: 'This is a description of project 1.',
          date: new Date('2023-01-01'),
          technologies: ['Javascript', 'Angular'],
          images: ['image1.jpg', 'image2.jpg'],
        },
        {
          name: 'Project 2',
          description: 'This is a description of project 2.',
          date: new Date('2023-02-01'),
          technologies: ['React', 'Next'],
          images: ['image3.jpg', 'image4.jpg'],
        },
        {
          name: 'Project 3',
          description: 'This is a description of project 3.',
          date: new Date('2023-03-01'),
          technologies: ['Java', 'Spring'],
          images: ['image5.jpg', 'image6.jpg'],
        },
        {
          name: 'Project 4',
          description: 'This is a description of project 4.',
          date: new Date('2023-04-01'),
          technologies: ['SQL', 'PostgreSQL'],
          images: ['image7.jpg', 'image8.jpg'],
        },
        {
          name: 'Project 5',
          description: 'This is a description of project 5.',
          date: new Date('2023-05-01'),
          technologies: ['React Native', 'Typescript'],
          images: ['image9.jpg', 'image10.jpg'],
        },
        {
          name: 'Project 6',
          description: 'This is a description of project 6.',
          date: new Date('2023-06-01'),
          technologies: ['Javascript', 'Angular'],
          images: ['image11.jpg', 'image12.jpg'],
        },
      ]
    },
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
      paused: 'Pausado',
      loading: 'Carregando...',
    },
    colorsWindow: {
      windowName: 'Colors',
      title: 'Dê o seu toque!',
      primary: 'Cor primária',
      secondary: 'Cor Secundária',
      light: 'Fonte Branca',
      dark: 'Fonte Preta',
    },
    projectronWindow: {
      windowName: 'Projectron',
      title: 'Projects & Technologies',
      subtitle: 'Search between my knwoledge and projects:',
      technologies: {
        frontend: [
          { category: 'Frontend', name: 'Javascript', timeStudied: new Date('2018-01-01'), description: 'Javascript is a programming language that is commonly used in web development. It allows developers to create interactive and dynamic web pages, and is supported by all modern web browsers.' },
          { category: 'Frontend', name: 'Angular', timeStudied: new Date('2020-01-01'), description: 'Angular is a web application framework developed by Google. It is used for building single-page applications and is based on TypeScript.' },
          { category: 'Frontend', name: 'React', timeStudied: new Date('2020-01-01'), description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and is widely used for building single-page applications.' },
          { category: 'Frontend', name: 'React Native', timeStudied: new Date('2020-01-01'), description: 'React Native is a framework for building mobile applications using React. It allows developers to create native apps for iOS and Android using JavaScript and React.' },
          { category: 'Frontend', name: 'Next', timeStudied: new Date('2020-01-01'), description: 'Next.js is a React framework that enables server-side rendering and static site generation. It is used for building fast and optimized web applications.' },
          { category: 'Frontend', name: 'Typescript', timeStudied: new Date('2020-01-01'), description: 'TypeScript is a superset of JavaScript that adds static typing to the language. It is developed and maintained by Microsoft and is widely used in large-scale applications.' },
        ],
        backend: [
          { category: 'Backend', name: 'Java', timeStudied: new Date('2018-01-01'), description: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is widely used for building enterprise applications.' },
          { category: 'Backend', name: 'Spring', timeStudied: new Date('2018-01-01'), description: 'Spring is a framework for building Java applications. It provides a comprehensive programming and configuration model for modern Java-based enterprise applications.' },
          { category: 'Backend', name: 'SQL', timeStudied: new Date('2018-01-01'), description: 'SQL (Structured Query Language) is a standard language for managing and manipulating databases. It is used for querying, updating, and managing data in relational database management systems.' },
          { category: 'Backend', name: 'PostgreSQL', timeStudied: new Date('2018-01-01'), description: 'PostgreSQL is a powerful, open-source object-relational database system. It is known for its reliability, feature robustness, and performance.' }
        ],
      },
      timeStudied: 'Time studied - X Years',
      projectListTitle: 'Recent Projects:',
      projects: [
        {
          name: 'Project 1',
          description: 'This is a description of project 1.',
          date: new Date('2023-01-01'),
          technologies: ['Javascript', 'Angular'],
          images: ['image1.jpg', 'image2.jpg'],
        },
        {
          name: 'Project 2',
          description: 'This is a description of project 2.',
          date: new Date('2023-02-01'),
          technologies: ['React', 'Next'],
          images: ['image3.jpg', 'image4.jpg'],
        },
        {
          name: 'Project 3',
          description: 'This is a description of project 3.',
          date: new Date('2023-03-01'),
          technologies: ['Java', 'Spring'],
          images: ['image5.jpg', 'image6.jpg'],
        },
        {
          name: 'Project 4',
          description: 'This is a description of project 4.',
          date: new Date('2023-04-01'),
          technologies: ['SQL', 'PostgreSQL'],
          images: ['image7.jpg', 'image8.jpg'],
        },
        {
          name: 'Project 5',
          description: 'This is a description of project 5.',
          date: new Date('2023-05-01'),
          technologies: ['React Native', 'Typescript'],
          images: ['image9.jpg', 'image10.jpg'],
        },
        {
          name: 'Project 6',
          description: 'This is a description of project 6.',
          date: new Date('2023-06-01'),
          technologies: ['Javascript', 'Angular'],
          images: ['image11.jpg', 'image12.jpg'],
        },
      ]
    },
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
