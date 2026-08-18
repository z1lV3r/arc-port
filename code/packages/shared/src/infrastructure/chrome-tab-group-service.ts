import { BrowserTabGroupService } from "../domain/interfaces/browser-tab-group-service";
import { TabGroup } from "../domain/models/tab-group";

export class ChromeTabGroupService implements BrowserTabGroupService {
    async createGroup(title: string, color: string, tabIds: string | string[], windowId?: number): Promise<TabGroup> {
        const tabIdsNumber: number | number[] = Array.isArray(tabIds) ? tabIds.map(tabId => parseInt(tabId)) : parseInt(tabIds);
        console.log("tabIdsNumber", tabIdsNumber);
        const groupId = await chrome.tabs.group({
            tabIds: tabIdsNumber,
            createProperties: { windowId: windowId }
        });
        console.log("groupId", groupId);

      await chrome.tabGroups.update(groupId, {
        title: title,
        color: color as chrome.tabGroups.ColorEnum,
      });
        console.log("tabGroups.update");

      return {
        id: groupId,
        title: title,
        color: color,
      }
    }
  
}