import type { BrowserTabEventService } from "@/app/domain/interfaces/browser-tab-event-service";
import { ListenersStore } from "@/app/domain/models/listeners-store";
import type { Listener } from "@/shared/domain/models/listener";

export class TabEventListenerUseCase {

  private browserTabEventService: BrowserTabEventService;

  constructor(
    browserTabEventService: BrowserTabEventService,
  ) {
    this.browserTabEventService = browserTabEventService;
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
