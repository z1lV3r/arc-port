import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserTabGroupsEventService } from "../domain/interfaces/browser-tab-groups-event-service";

export class TabGroupsEventListenerUseCases {
  private browserTabGroupsEventService: BrowserTabGroupsEventService;

  constructor(browserTabGroupsEventService: BrowserTabGroupsEventService) {
    this.browserTabGroupsEventService = browserTabGroupsEventService;
  }

  registerOnTabGroupChangedEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabGroupsEventService.registerOnTabGroupChangedEventListeners(
      listenersStore,
    );
  }

  registerOnTabGroupCreatedEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabGroupsEventService.registerOnTabGroupCreatedEventListeners(
      listenersStore,
    );
  }

  registerOnTabGroupMovedEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabGroupsEventService.registerOnTabGroupMovedEventListeners(
      listenersStore,
    );
  }

  registerOnTabGroupRemovedEventListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserTabGroupsEventService.registerOnTabGroupRemovedEventListeners(
      listenersStore,
    );
  }
}
