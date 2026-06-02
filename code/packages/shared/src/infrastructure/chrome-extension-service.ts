import type { ListenersStore } from "@/app/domain/models/listeners-store";
import type { BrowserExtensionService } from "../domain/interfaces/browser-extension-service";

export class ChromeExtensionService implements BrowserExtensionService {
  registerOnExtensionInstalledListeners(listenersStore: ListenersStore): void {
    chrome.runtime.onInstalled.addListener(() => {
      for (const [_, listener] of listenersStore.getAllListeners()) {
        listener.command();
      }
    });
  }
}
