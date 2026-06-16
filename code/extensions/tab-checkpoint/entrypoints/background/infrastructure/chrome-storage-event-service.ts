import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserStorageEventService } from "../domain/interfaces/browser-storage-event-service";

export class ChromeStorageEventService implements BrowserStorageEventService {
  async registerStorageEventListeners(listenersStore: ListenersStore) {
    chrome.storage.onChanged.addListener(async (changes) => {
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
      // Call all listeners that listen to this key
      const listener = listenersStore.getListener(key);
      if (listener) {
        await listener.command(oldValue, newValue);
      }
    }
  });

  }
}