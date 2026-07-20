import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserTabEventService } from "../domain/interfaces/browser-tab-event-service";

export class TabEventListenerUseCases {
  private browserTabEventService: BrowserTabEventService;

  constructor(browserTabEventService: BrowserTabEventService) {
    this.browserTabEventService = browserTabEventService;
  }

  registerOnTabActivatedEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabEventService.registerOnTabActivatedEventListeners(
      listenersStore,
    );
  }

  registerOnCloseTabEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabEventService.registerOnCloseTabEventListeners(
      listenersStore,
    );
  }

  registerOnUpdateTabEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabEventService.registerOnUpdateTabEventListeners(
      listenersStore,
    );
  }

  registerOnCreateTabEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabEventService.registerOnCreateTabEventListeners(
      listenersStore,
    );
  }
}
