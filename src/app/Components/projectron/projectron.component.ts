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
      .subscribe((e) => {
        this.listHandler.selectedTechnolgy = e.technologies.frontend[0]
        this.listHandler.selectedProject = e.projects[0]
      });

    this.listHandler.slideShow = {
      show: true,
      index: 0
    }
  }

  listHandler: { selectedTechnolgy: Technology, selectedProject: Project, year: number, slideShow: { show: boolean, index: number } } = {
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
    slideShow: {
      show: false,
      index: 0
    },
    year: new Date().getFullYear(),
  };

  closeImageSlideShow() {
    this.listHandler.slideShow.show = false;
  }

  changeSelectedTechnology(technology: Technology) {
    this.resetSelectedProject();
    this.listHandler.selectedTechnolgy = technology;
  }
  changeSelectedProject(project: Project) {
    this.listHandler.selectedProject = project;
  }
  resetSelectedProject() {
    this.listHandler.selectedProject = {
      name: '',
      description: '',
      images: [],
      date: new Date(),
      technologies: [],
    };
  }

  setImageSlideShow(image: number) {
    this.listHandler.slideShow = {
      show: true,
      index: image
    }
  }
  closeImageSlideShowOnClick() {
    this.listHandler.slideShow = {
      show: false,
      index: 0
    }
  }
  changeImageSlideShowIndex(index: number) {
    this.listHandler.slideShow.index = index >= 0 && index < this.listHandler.selectedProject.images.length ? index : this.listHandler.slideShow.index;
  }

  //X and Y as percentage position of the screen,
  //simple translate(-50%,-50%) and left/top manipulation on WindowComponent
  position: { x: number; y: number } = {
    x: (window.innerWidth * 50) / 100,
    y: (window.innerHeight * 50) / 100,
  };
}
