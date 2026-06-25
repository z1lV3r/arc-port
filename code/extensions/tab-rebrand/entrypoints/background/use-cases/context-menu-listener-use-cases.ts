import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserContextMenuService } from "../domain/interfaces/browser-context-menu-service";

export class ContextMenuListenerUseCases {
  private browserContextMenuService: BrowserContextMenuService;

  constructor(browserContextMenuService: BrowserContextMenuService) {
    this.browserContextMenuService = browserContextMenuService;
  }

  registerContextMenuListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserContextMenuService.registerContextMenuListeners(listenersStore);
  }
}
