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

  async createTabByUrl(url: string): Promise<Tab> {
    const options: chrome.tabs.CreateProperties = { url };
    const tab = await chrome.tabs.create(options);

    return new Tab(
      tab.id?.toString() || "",
      tab.url || "",
      tab.index,
      tab.groupId,
      tab.pinned
    );
  }

  async createTab(tab: Tab): Promise<Tab> {
    const options: chrome.tabs.CreateProperties = tab.index !== undefined ? { url: tab.url, index: tab.index, pinned: tab.pinned } : { url: tab.url, pinned: tab.pinned };
    const newTab = await chrome.tabs.create(options);

    if (tab.groupId !== undefined && newTab.id !== undefined && tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      await chrome.tabs.group({ tabIds: newTab.id, groupId: tab.groupId });
    }

    return new Tab(
      newTab.id?.toString() || "",
      newTab.url || "",
      newTab.index,
      tab.groupId ?? newTab.groupId,
      tab.pinned ?? newTab.pinned
    );
  }

  async closeTab(id: string): Promise<void> {
    if (!id) return;
    await chrome.tabs.remove(parseInt(id));
  }

  async setCustomName(id: string, customName: string): Promise<void> {
    if (!id || !customName) return;
    await chrome.scripting.executeScript({
      target: { tabId: parseInt(id) },
      func: (name: string) => { document.title = name; },
      args: [customName],
    });
  }
}
