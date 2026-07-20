import type { Listener } from "@repo/shared/domain/models/listener";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserShortcutService } from "../domain/interfaces/browser-shortcut-service";

export class ShortcutListenerUseCases {
  private browserShortcutService: BrowserShortcutService;

  constructor(browserShortcutService: BrowserShortcutService) {
    this.browserShortcutService = browserShortcutService;
  }

  registerShortcutListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserShortcutService.registerShortcutListeners(listenersStore);
  }
}
