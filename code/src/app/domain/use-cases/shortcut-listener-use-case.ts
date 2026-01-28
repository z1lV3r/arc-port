import type { BrowserShortcutService } from "@/app/domain/interfaces/browser-shortcut-service";
import { ListenersStore } from "@/app/domain/models/listeners-store";
import type { Listener } from "@/shared/domain/models/listener";

export class ShortcutListenerUseCase {

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
