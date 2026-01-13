import type { TabsService } from "@/features/default-url/domain/interfaces/tabs-service";
import { Tab } from "@/features/default-url/domain/models/tab";

export class ChromeTabsService implements TabsService {
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
    );
  }

  async createTab(url: string, index: number): Promise<Tab> {
    const tab = await chrome.tabs.create({ url, index });
    return new Tab(tab.id?.toString() || "", tab.url || "", tab.index);
  }

  async closeTab(id: string): Promise<void> {
    if (!id) return;
    await chrome.tabs.remove(parseInt(id));
  }
}
