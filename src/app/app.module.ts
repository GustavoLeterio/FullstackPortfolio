import { colorsReducer } from './store/colors/colors.reducer';
import { windowReducer } from './store/window/window.reducer';
import { languageReducer } from './store/language/language.reducer';
import { soundReducer } from './store/sound/sound.reducer';
import { CallMeBabyComponent } from './Components/call-me-baby/call-me-baby.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LtrMusicPlayerComponent } from './Components/ltr-music-player/ltr-music-player.component';
import { ProjectronComponent } from './Components/projectron/projectron.component';
import { BiographBotComponent } from './Components/biograph-bot/biograph-bot.component';
import { WindowComponent } from './Components/window/window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from '../directives/ClickOutsideDirective';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxParticlesModule } from "@tsparticles/angular";
import { IconComponent } from './Components/icon/icon.component';
import { ColorsComponent } from './Components/colors/colors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CallMeBabyComponent,
    LtrMusicPlayerComponent,
    ProjectronComponent,
    BiographBotComponent,
    ColorsComponent,
    WindowComponent,
    IconComponent,
  ],
  imports: [
    NgxParticlesModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClickOutsideDirective,
    FormsModule,
    StoreModule.forRoot({
      soundReducer,
      windowReducer,
      languageReducer,
      colorsReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
