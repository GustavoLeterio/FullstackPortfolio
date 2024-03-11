import { Component } from '@angular/core';
import { Language, languages } from '../domain/languageObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  language:Language = ["pt", "pt-AO", "pt-BR", "pt-CH", "pt-CV", "pt-GQ",
  "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL"].includes(navigator.language) ? languages.portuguese : languages.english;
}
