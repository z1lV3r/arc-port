import { TabsService } from "@/features/default-url/domain/interfaces/tabs-service";
import { Tab } from "@/features/default-url/domain/models/tab";

export class MockTabsService implements TabsService {
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

  async createTab(url: string, index: number): Promise<Tab> {
    const id = Math.random().toString(36).substring(7);
    const tab = new Tab(id, url, index);
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