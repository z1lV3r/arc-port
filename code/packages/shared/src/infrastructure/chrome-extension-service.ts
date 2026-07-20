import type { BrowserExtensionService } from "../domain/interfaces/browser-extension-service";
import type { ListenersStore } from "../domain/models/listeners-store";

export class ChromeExtensionService implements BrowserExtensionService {
  registerOnExtensionInstalledListeners(listenersStore: ListenersStore): void {
    chrome.runtime.onInstalled.addListener(() => {
      for (const [_, listener] of listenersStore.getAllListeners()) {
        listener.command();
      }
    });
  }
}
