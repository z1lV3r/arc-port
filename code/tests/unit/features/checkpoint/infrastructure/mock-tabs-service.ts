import { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@/shared/domain/models/tab";


export class MockTabsService implements BrowserTabsService {
  private currentTab: Tab | null = null;
  private tabs = new Map<string, Tab>();

  setTabs(tabs: { tabId: string; expectedUrl: string }[]) {
    for (const { tabId, expectedUrl } of tabs) {
      this.tabs.set(tabId, new Tab(tabId, expectedUrl, 0));
    }
    this.currentTab = this.tabs.get(tabs[0].tabId);
  }

  setCurrentTab(tabId: string) {
    this.currentTab = this.tabs.get(tabId);
  }

  async getCurrentTab(): Promise<Tab> {
    if (!this.currentTab) {
      throw new Error("No current tab set in mock");
    }
    return this.currentTab;
  }

  async getTab(id: string): Promise<Tab> {
    const tab = this.tabs.get(id);
    if (!tab) throw new Error(`Tab ${id} not found`);
    return tab;
  }

  async createTab(url: string, index: number, groupId?: number, pinned?: boolean): Promise<Tab> {
    const id = Math.random().toString(36).substring(7);
    const tab = new Tab(id, url, index, groupId, pinned);
    this.tabs.set(id, tab);
    return tab;
  }

  async closeTab(id: string): Promise<void> {
    this.tabs.delete(id);
    if (this.currentTab?.id === id) {
      this.currentTab = null;
    }
  }
}