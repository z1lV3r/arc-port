import type { BrowserExtensionService } from "@repo/shared/domain/interfaces/browser-extension-service";
import { ListenersStore } from "@repo/shared/domain/models/listeners-store";
import type { Listener } from "@repo/shared/domain/models/listener";

export class ExtensionListenerUseCases {

  private browserExtensionService: BrowserExtensionService;

  constructor(
    browserExtensionService: BrowserExtensionService,
  ) {
    this.browserExtensionService = browserExtensionService;
  }

  registerOnExtensionInstalledListeners(listeners: Listener[][]) {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners(listeners);
    this.browserExtensionService.registerOnExtensionInstalledListeners(listenersStore);
  }
}