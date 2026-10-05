import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserWindowEventService } from "../domain/interfaces/browser-window-event-service";

export default class ChromeWindowEventService implements BrowserWindowEventService {
  async registerOnFocusedWindowEventListeners(listenersStore: ListenersStore) {
    chrome.windows.onFocusChanged.addListener(async (windowId) => {
      if (windowId === chrome.windows.WINDOW_ID_NONE) return;
      for (const [_, windowEventListener] of listenersStore.getAllListeners()) {
        await windowEventListener.command(windowId.toString());
      }
    });
  }

  async registerOnCreatedWindowEventListeners(listenersStore: ListenersStore) {
    chrome.windows.onCreated.addListener(async (window) => {
      if (!window.id) return;
      for (const [_, windowEventListener] of listenersStore.getAllListeners()) {
        await windowEventListener.command(window.id.toString());
      }
    });
  }

  async registerOnRemovedWindowEventListeners(listenersStore: ListenersStore) {
    chrome.windows.onRemoved.addListener(async (windowId) => {
      for (const [_, windowEventListener] of listenersStore.getAllListeners()) {
        await windowEventListener.command(windowId.toString());
      }
    });
  }

}
