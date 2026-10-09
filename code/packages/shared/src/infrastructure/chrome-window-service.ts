import type { BrowserWindowService } from "../domain/interfaces/browser-window-service";
import { Tab } from "../domain/models/tab";
import { Window } from "../domain/models/window";

export class ChromeWindowService implements BrowserWindowService {
  async create(url?: string | string[] | undefined): Promise<Window> {
    const window = await chrome.windows.create({ url: url });
    if (!window.id) {
      throw new Error("Failed to create window");
    }

    return new Window(window.id, window.tabs?.map((tab) => new Tab(tab.id?.toString() || "", tab.url || "", tab.index, tab.groupId, tab.pinned, undefined, undefined, window.id)) || []);
  }

  async getCurrentWindow(): Promise<Window> {
    // `chrome.windows.getCurrent()` is unreliable in a service worker (it falls
    // back to the last active window, and can resolve the most recently opened
    // window while a pop-up is visible), so list the windows and use the one
    // that is actually focused.
    const windows = await chrome.windows.getAll();
    const window = windows.find((candidate) => candidate.focused);
    if (!window?.id) {
      throw new Error("Failed to get current window");
    }
    return new Window(window.id, window.tabs?.map((tab) => new Tab(tab.id?.toString() || "", tab.url || "", tab.index, tab.groupId, tab.pinned, undefined, undefined, window.id)) || []);
  }

  async focus(windowId: number): Promise<void> {
    await chrome.windows.update(windowId, { focused: true });
  }
}
