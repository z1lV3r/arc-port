export class Tab {
  id: string;
  url: string;
  index: number;
  groupId?: number;
  pinned?: boolean;
  customTitle?: string;

  constructor(
    id: string,
    url: string,
    index: number,
    groupId?: number,
    pinned?: boolean,
    customTitle?: string,
  ) {
    this.id = id;
    this.url = url;
    this.index = index;
    this.groupId = groupId;
    this.pinned = pinned;
    this.customTitle = customTitle;
  }
}
