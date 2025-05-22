import { map, Observable } from 'rxjs';
import { TextProjectronWindow } from '../../../Interfaces/ITextProjectronWindow';
import { Component, EventEmitter, Output } from '@angular/core';
import { TWindowState } from '../../store/window/window.state';
import { Store } from '@ngrx/store';
import { ILanguageState } from '../../store/language/language.state';
import { Project } from '../../../Interfaces/IProject';
import { Technology } from '../../../Interfaces/ITechnology';

@Component({
  selector: 'window-projectron',
  templateUrl: './projectron.component.html',
  styleUrl: './projectron.component.scss'
})
export class ProjectronComponent {
  constructor(
    private store: Store<{
      windowReducer: TWindowState;
      languageReducer: ILanguageState;
    }>
  ) { }
  language$: Observable<TextProjectronWindow> = this.store
    .select('languageReducer')
    .pipe(map((e) => e.texts.projectronWindow));

  ngOnInit(): void {
    this.language$
      .subscribe((e) => (this.listHandler.selectedTechnolgy = e.technologies.frontend[0]));
  }

  listHandler: { selectedTechnolgy: Technology, selectedProject: Project, year: number } = {
    selectedTechnolgy: {
      name: 'Javascript',
      category: 'Backend',
      timeStudied: new Date(),
      description: '',
    },
    selectedProject: {
      name: '',
      description: '',
      images: [],
      date: new Date(),
      technologies: [],
    },
    year: new Date().getFullYear(),
  };

  changeSelectedTechnology(technology: Technology) {
    this.listHandler.selectedTechnolgy = technology; 
  }

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 50) / 100,
    y: (window.innerHeight * 50) / 100,
  };
}
