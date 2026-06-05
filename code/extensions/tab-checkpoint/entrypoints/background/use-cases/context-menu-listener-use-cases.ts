import type { BrowserContextMenuService } from "../domain/interfaces/browser-context-menu-service";
import { ListenersStore } from "../domain/models/listeners-store";
import type { Listener } from "@/shared/domain/models/listener";

export class ContextMenuListenerUseCases {

  private browserContextMenuService: BrowserContextMenuService;

  constructor(
    browserContextMenuService: BrowserContextMenuService,
  ) {
    this.browserContextMenuService = browserContextMenuService;
  }

  registerContextMenuListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserContextMenuService.registerContextMenuListeners(
      listenersStore,
    );
  }
}
