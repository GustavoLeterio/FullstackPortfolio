import { CallMeBabyComponent } from './Components/call-me-baby/call-me-baby.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LtrMusicPlayerComponent } from './Components/ltr-music-player/ltr-music-player.component';
import { ProjectronComponent } from './Components/projectron/projectron.component';
import { BiographBotComponent } from './Components/biograph-bot/biograph-bot.component';
import { WindowComponent } from './Components/window/window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CallMeBabyComponent,
    LtrMusicPlayerComponent,
    ProjectronComponent,
    BiographBotComponent,
    WindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
