export class Tab {
  id: string;
  url: string;
  index: number;

  constructor(id: string, url: string, index: number) {
    this.id = id;
    this.url = url;
    this.index = index;
  }
}
