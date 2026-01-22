import { DefaultUrlShortcutListenerProvider } from "@/features/default-url/presentation/background/shortcut-listener-provider";
import type { BrowserShortcutService } from "@/app/domain/interfaces/browser-shortcut-service";
import { DependencyProvider } from "@/app/dependency-provider";
import { ListenersStore } from "@/app/domain/models/listeners-store";

export class ShortcutListenerProvider {
  private browserShortcutService: BrowserShortcutService;
  constructor(browserShortcutService: BrowserShortcutService = new DependencyProvider().getBrowserShortcutService()) {
    this.browserShortcutService = browserShortcutService;
  }

  registerShortcutListeners() {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners([
      new DefaultUrlShortcutListenerProvider().getShortcutListeners(),
    ]);
    this.browserShortcutService.registerShortcutListeners(listenersStore);
  }
}
