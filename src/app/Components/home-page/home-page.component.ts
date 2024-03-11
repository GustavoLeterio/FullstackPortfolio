import { Component, Input } from '@angular/core';
import { Language, languages } from '../../../domain/languageObject';

@Component({
  selector: 'window-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isClosed: boolean = false;

  @Input({ required: true }) language: Language = ["pt", "pt-AO", "pt-BR", "pt-CH", "pt-CV", "pt-GQ",
    "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL"].includes(navigator.language) ? languages.portuguese : languages.english;

  ngOnInit() {
    console.log(navigator.language)
  }

  //X/Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent 
  position: { x: number, y: number } = { x: window.innerWidth * 50 / 100, y: window.innerHeight * 50 / 100 }
}


