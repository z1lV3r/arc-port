import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserStorageEventService } from "../domain/interfaces/browser-storage-event-service";

export class SettingChangeEventListenerUseCases {
  private browserStorageEventService: BrowserStorageEventService;
  constructor(browserStorageEventService: BrowserStorageEventService) {
    this.browserStorageEventService = browserStorageEventService;
  }
  registerSettingChangeEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserStorageEventService.registerSettingChangeEventListeners(
      listenersStore,
    );
  }
}
