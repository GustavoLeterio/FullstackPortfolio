import { WindowNames } from "../Types/TWindowNames";

export interface TextHomeWindow {
  windowName: String;
  title: String;
  presentation: String;
  curiosities: String[];
  optionsTitleText: String;
  options: {windowName:WindowNames,text:String}[];
}
