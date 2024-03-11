import { Component, Input } from '@angular/core';
import { Language, languages } from '../../../domain/languageObject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({ required: true }) language: Language = ["pt", "pt-AO", "pt-BR", "pt-CH", "pt-CV", "pt-GQ",
    "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL"].includes(navigator.language) ? languages.portuguese : languages.english;
  languageName = ["pt", "pt-AO", "pt-BR", "pt-CH", "pt-CV", "pt-GQ",
    "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL"].includes(navigator.language) ? "portuguese" : "english";
  isSoundEnabled: boolean = true;

  timeChangeInterval: any;
  time: string = "";

  ngOnInit() {
    this.timeChangeInterval = setInterval(() => {
      this.time = new Intl.DateTimeFormat('pt-BR', {
        weekday: "short" as "short",
        day: "2-digit" as "2-digit",
        month: "short" as "short",
        year: "numeric" as "numeric",
        hour: "numeric" as "numeric",
        minute: "numeric" as "numeric",
        hour12: false
      }).format(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timeChangeInterval);
  }

}
