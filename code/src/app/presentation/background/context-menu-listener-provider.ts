import type { BrowserContextMenuService } from "@/app/domain/interfaces/browser-context-menu-service";
import { DefaultUrlContextMenuListenerProvider } from "@/features/default-url/presentation/background/context-menu-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { ListenersStore } from "@/app/domain/models/listeners-store";

export class ContextMenuListenerProvider {
  browserContextMenuService: BrowserContextMenuService;
  constructor(
    browserContextMenuService: BrowserContextMenuService = new DependencyProvider().getBrowserContextMenuService(),
  ) {
    this.browserContextMenuService = browserContextMenuService;
  }

  registerContextMenuListeners() {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners([
      new DefaultUrlContextMenuListenerProvider().getContextMenuListeners(),
    ]);
    this.browserContextMenuService.registerContextMenuListeners(
      listenersStore,
    );
  }
}
