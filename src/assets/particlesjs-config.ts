import {
  IOptions,
  ISourceOptions,
  MoveDirection,
  OutMode,
  RecursivePartial,
} from '@tsparticles/engine';

export const particlesSettings: ISourceOptions = {
  autoPlay: true,
  clear: true,
  defaultThemes: {},
  delay: 0,
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: true,
        mode:'grab'
      },
      resize: {
        delay: 0.5,
        enable: true,
      },
    },
  },
  particles: {
    color: {
      value: '#ffc9c9',
    },
    effect: {
      close: true,
      fill: true,
      options: {},
    },
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      enable: true,
      size: false,
      speed: 1,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      limit: {
        mode: 'delete',
        value: 0,
      },
      value: 200,
    },
    opacity: {
      value: .3,
      animation: {
        count: 0,
        enable: false,
        speed: 2,
        decay: 0,
        delay: 0,
        sync: false,
        mode: 'auto',
        startValue: 'random',
        destroy: 'none',
      },
    },
    links: {
      color: {
        value: '#ffc9c9',
      },
      distance: 150,
      enable: true,
      frequency: 1,
      opacity: 0.4,
      width: 1,
      shadow: {
        blur: 5,
        color: {
          value: "#3d3b78",
        },
        enable: false,
      },
    },

  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};
