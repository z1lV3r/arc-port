import type { BrowserService } from "../domain/interfaces/browser-service";

export class ChromeBrowserService implements BrowserService {
  async openPopup(focusElementId?: string): Promise<void> {
    if (focusElementId) {
      await chrome.storage.session.set({ focusElementId });
    }
    await chrome.action.openPopup();
  }
}
