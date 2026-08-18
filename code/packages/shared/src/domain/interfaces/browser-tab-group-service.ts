import { TabGroup } from "../models/tab-group";

export interface BrowserTabGroupService {
  createGroup(title: string, color: string, tabIds: string | string[], windowId?: number): Promise<TabGroup>;
}
