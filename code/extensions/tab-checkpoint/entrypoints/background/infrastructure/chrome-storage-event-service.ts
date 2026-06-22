import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";
import { StorageListener } from "@repo/shared/domain/models/storage-listener";

import type { BrowserStorageEventService } from "../domain/interfaces/browser-storage-event-service";

export class ChromeStorageEventService implements BrowserStorageEventService {
  async registerSettingChangeEventListeners(listenersStore: ListenersStore) {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        const listener = listenersStore.getListener(key);
        if (listener) {
          await listener.command(oldValue, newValue);
        }
      }
    });
  }

  async registerStorageEventListeners(listenersStore: ListenersStore) {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        for (const [, listener] of listenersStore.getAllListeners()) {
          const applicableKeys = (listener as unknown as StorageListener)
            .applicableKeys;
          if (new RegExp(applicableKeys).test(key)) {
            await listener.command(key, [oldValue, newValue]);
          }
        }
      }
    });
  }
}
