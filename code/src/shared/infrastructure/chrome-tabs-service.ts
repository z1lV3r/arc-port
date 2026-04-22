import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@/shared/domain/models/tab";

export class ChromeTabsService implements BrowserTabsService {
  async getCurrentTab(): Promise<Tab> {
    if (!chrome || !chrome.tabs) {
      return new Tab("", "", 0);
    }
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tabs || !tabs[0]) {
      return new Tab("", "", 0);
    }
    return new Tab(
      tabs[0].id?.toString() || "",
      tabs[0].url || "",
      tabs[0].index,
      tabs[0].groupId,
      tabs[0].pinned
    );
  }

  async getTab(id: string): Promise<Tab> {
    if (!chrome || !chrome.tabs) {
      return new Tab("", "", 0);
    }
    const tab = await chrome.tabs.get(parseInt(id));
    if (!tab) {
      return new Tab("", "", 0);
    }
    const url = tab.url || tab.pendingUrl || "";
    return new Tab(tab.id?.toString() || "", url, tab.index, tab.groupId, tab.pinned);
  }

  async createTab(url: string, index?: number, groupId?: number, pinned?: boolean): Promise<Tab> {
    const options: chrome.tabs.CreateProperties = index !== undefined ? { url, index, pinned } : { url, pinned };
    const tab = await chrome.tabs.create(options);

    if (groupId !== undefined && tab.id !== undefined && groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      await chrome.tabs.group({ tabIds: tab.id, groupId });
    }

    return new Tab(
      tab.id?.toString() || "",
      tab.url || "",
      tab.index,
      groupId ?? tab.groupId,
      pinned ?? tab.pinned
    );
  }

  async closeTab(id: string): Promise<void> {
    if (!id) return;
    await chrome.tabs.remove(parseInt(id));
  }
}
