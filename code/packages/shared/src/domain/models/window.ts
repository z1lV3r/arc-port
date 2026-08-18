import { Tab } from "./tab";

export class Window {
  id: number;
  tabs: Tab[];

  constructor(id: number, tabs: Tab[]) {
    this.id = id;
    this.tabs = tabs;
  }
}