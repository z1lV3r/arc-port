import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserStorageEventService } from "../domain/interfaces/browser-storage-event-service";
import { StorageListener } from "@repo/shared/domain/models/storage-listener";

export class ChromeStorageEventService implements BrowserStorageEventService {
  async registerSettingChangeEventListeners(listenersStore: ListenersStore) {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [, listener] of listenersStore.getAllListeners()) {
        const regex = new RegExp((listener as unknown as StorageListener).applicableKeys);
        for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
          if (regex.test(key)) {
            await listener.command(oldValue, newValue);
          }
        }
      }
    });
  }

  async registerStorageEventListeners(listenersStore: ListenersStore) {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        for (const [, listener] of listenersStore.getAllListeners()) {
            console.log(listener);
            const applicableKeys = (listener as unknown as StorageListener).applicableKeys.split(",");
            if (applicableKeys.includes(key)) {
              await listener.command(oldValue, newValue);
            }
          
        }
      }
    });
  }
}