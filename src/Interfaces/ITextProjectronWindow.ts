import { Project } from "./IProject";
import { Technology } from "./ITechnology";

export interface TextProjectronWindow {
  windowName: String;
  title: String;
  subtitle: String;
  technologies:{frontend:Technology[]; backend:Technology[]};
  projectListTitle: String;
  timeStudied: String;
  projects:Project[];
}
