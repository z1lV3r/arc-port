import type { BrowserService } from "@/features/default-url/domain/interfaces/browser-service";

export class ChromeBrowserService implements BrowserService {
  async loadPage(url: string): Promise<void> {
    if (!chrome || !chrome.tabs) {
      return;
    }
    await chrome.tabs.update({ url });
  }
}