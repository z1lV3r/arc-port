export class Tab {
  id: string;
  url: string;
  index: number;
  groupId?: number;
  pinned?: boolean;

  constructor(id: string, url: string, index: number, groupId?: number, pinned?: boolean) {
    this.id = id;
    this.url = url;
    this.index = index;
    this.groupId = groupId;
    this.pinned = pinned;
  }
}
