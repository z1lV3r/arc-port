export class Tab {
  id: string;
  url?: string;
  index: number;
  groupId?: number;
  pinned?: boolean;
  customTitle?: string;
  customIconUrl?: string;
  windowId?: number;

  constructor(
    id: string,
    url: string | undefined,
    index: number,
    groupId?: number,
    pinned?: boolean,
    customTitle?: string,
    customIconUrl?: string,
    windowId?: number,
  ) {
    this.id = id;
    this.url = url;
    this.index = index;
    this.groupId = groupId;
    this.pinned = pinned;
    this.customTitle = customTitle;
    this.customIconUrl = customIconUrl;
    this.windowId = windowId;
  }
}
