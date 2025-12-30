import type { TabsService } from "@/features/default-url/domain/interfaces/tabs-service";
import { Tab } from "@/features/default-url/domain/models/tab";

export class ChromeTabsService implements TabsService {
  async getCurrentTab(): Promise<Tab> {
    if (!chrome || !chrome.tabs) {
      return new Tab("", "");
    }
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tabs || !tabs[0]) {
      return new Tab("", "");
    }
    return new Tab(tabs[0].id?.toString() || "", tabs[0].url || "");
  }
}
