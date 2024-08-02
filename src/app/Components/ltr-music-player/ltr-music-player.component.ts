import { Observable, map } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ILanguageState } from '../../store/language/language.state';
import { ISoundState } from '../../store/sound/sound.state';
import { DOCUMENT } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';
@Component({
  selector: 'window-ltr-music-player',
  templateUrl: './ltr-music-player.component.html',
  styleUrl: './ltr-music-player.component.scss',
})
export class LtrMusicPlayerComponent {
  @Output() windowOpen: EventEmitter<String> = new EventEmitter<String>();

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private store: Store<{
      languageReducer: ILanguageState;
      soundReducer: ISoundState;
    }>
  ) {}
  language$ = this.store
    .select('languageReducer')
    .pipe(map((e) => e.texts.ltrMusicPlayerWindow));

  sound$ = this.store.select('soundReducer').pipe(map((e) => e));

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 15) / 100,
    y: (window.innerHeight * 80) / 100,
  };

  timeoutResize: any;
  @HostListener('window:resize')
  resize() {
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.position = {
        x: (window.innerWidth * 15) / 100,
        y: (window.innerHeight * 80) / 100,
      };
    });
  }

  music: {
    wave: WaveSurfer | null;
    isLoading: boolean;
    audioSources: {
      musics: { source: string; name: string; author: string }[];
      index: number;
    };
  } = {
    audioSources: {
      musics: [
        {
          source: 'City_Passanger.mp3',
          name: 'City Passanger',
          author: 'Gustavo Letério',
        },
        {
          source: 'Unnamed_Lo-Fi.mp3',
          name: 'City Passanger',
          author: 'Gustavo Letério',
        },
        {
          source: 'Water_Drop.mp3',
          name: 'City Passanger',
          author: 'Gustavo Letério',
        },
      ],
      index: 0,
    },
    wave: null,
    isLoading: true,
  };

  ngAfterViewInit() {
    this.changeMusic();
  }

  changeMusicIndex(go: 'forward' | 'backward') {
    if (go == 'forward') {
      if (
        this.music.audioSources.index ==
        this.music.audioSources.musics.length - 1
      )
        this.music.audioSources.index = 0;
      else this.music.audioSources.index += 1;
    } else {
      if (this.music.audioSources.index == 0)
        this.music.audioSources.index =
          this.music.audioSources.musics.length - 1;
      else this.music.audioSources.index -= 1;
    }
    this.changeMusic();
  }

  setTimeAsMinSec(time: number) {
    let minutes = Math.floor(time / 60);
    let remainingSeconds = Math.floor(time % 60);

    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return formattedMinutes + ':' + formattedSeconds;
  }

  changeMusic() {
    this.music.wave?.destroy();
    this.music.isLoading = true;
    this.generateWaveform(
      this.music.audioSources.musics[this.music.audioSources.index].source
    );
  }

  togglePause() {
    if (!this.music.wave) {
      this.changeMusic();
    }
    if (this.music.wave?.isPlaying()) {
      this.music.wave?.pause();
    } else {
      this.music.wave?.play();
    }
  }
  generateWaveform(source: string): void {
    this.music.wave = WaveSurfer.create({
      ...this.music.wave?.options,
      container: '#waveform',
      waveColor: 'grey',
      progressColor: 'purple',
      url: source,
      cursorColor: 'transparent',
      height: 50,
      dragToSeek: true,
    });
    this.music.wave.on('ready', () => {
      this.sound$.subscribe((state) => {
        this.music.wave?.setVolume(state.volume / 100);
      });
      this.music.isLoading = false;
      this.music.wave?.play();
    });
    this.music.wave.load('/assets/audios/' + source);
    this.music.wave?.on('finish', () => {
      this.changeMusicIndex('forward');
    });
  }
}
