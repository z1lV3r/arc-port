import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserWindowEventService } from "../domain/interfaces/browser-window-event-service";

export class WindowEventListenerUseCases {
  private browserWindowEventService: BrowserWindowEventService;

  constructor(browserWindowEventService: BrowserWindowEventService) {
    this.browserWindowEventService = browserWindowEventService;
  }

  registerOnFocusedWindowEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserWindowEventService.registerOnFocusedWindowEventListeners(
      listenersStore,
    );
  }

  registerOnCreatedWindowEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserWindowEventService.registerOnCreatedWindowEventListeners(
      listenersStore,
    );
  }

  registerOnRemovedWindowEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserWindowEventService.registerOnRemovedWindowEventListeners(
      listenersStore,
    );
  }

}
