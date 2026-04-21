export class Tab {
  id: string;
  url: string;
  index: number;
  groupId?: number;

  constructor(id: string, url: string, index: number, groupId?: number) {
    this.id = id;
    this.url = url;
    this.index = index;
    this.groupId = groupId;
  }
}
