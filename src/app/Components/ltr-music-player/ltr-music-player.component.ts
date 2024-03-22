import { Observable, map } from 'rxjs';
import {
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
import { changePause } from '../../store/sound/sound.actions';
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
    x: (window.innerWidth * 50) / 100,
    y: (window.innerHeight * 50) / 100,
  };

  timeoutResize: any;
  @HostListener('window:resize')
  resize() {
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.position = {
        x: (window.innerWidth * 50) / 100,
        y: (window.innerHeight * 50) / 100,
      };
    });
  }

  musicPlayer: HTMLAudioElement = new Audio();
  audioSources: { sources: string[]; index: number } = {
    sources: ['City_Passanger.mp3', 'Unnamed_Lo-Fi.mp3', 'Water_Drop.mp3'],
    index: 0,
  };

  ngOnInit() {
    this.sound$.subscribe((state) => {
      this.musicPlayer.volume = state.volume;
    });
    this.musicPlayer.src = 'assets/audios/' + this.audioSources.sources[0];

    const startPlaying = () => {
      this.musicPlayer.load();
      this.musicPlayer.play();
      this._document.removeEventListener('mousemove', startPlaying);
    };
    this._document.addEventListener('mousemove', startPlaying);
  }

  ngOnDestroy(): void {}

  changeMusic(go: 'forward' | 'backward') {
    this.musicPlayer.pause();
    this.audioSources.index =
      go == 'forward'
        ? this.audioSources.index == this.audioSources.sources.length - 1
          ? this.audioSources.index + 1
          : 0
        : this.audioSources.index - 1;
    this.musicPlayer.src = this.audioSources.sources[this.audioSources.index];
    this.musicPlayer.load();
    this.musicPlayer.play();
  }

  togglePause() {
    var isPaused: boolean = false;
    this.sound$.subscribe((state) => {
      isPaused = state.isPaused;
    });
    this.store.dispatch(changePause({ isPaused: !isPaused }));
    if (!isPaused) {
      this.musicPlayer.pause();
    } else {
      this.musicPlayer.load();
      this.musicPlayer.play();
    }
  }
}
