import type { BrowserContextMenuService } from "@/shared/domain/interfaces/browser-context-menu-service";
import type { ContextMenuListener } from "../domain/models/context-menu-listener";

export class ChromeContextMenuService implements BrowserContextMenuService {
  removeFeatureContextMenus(
    featureName: string,
    listeners: ContextMenuListener[],
  ): void {
    for (const listener of listeners) {
      chrome.contextMenus.remove(
        listener.name,
        () => void chrome.runtime.lastError,
      );
    }
    chrome.contextMenus.remove(
      featureName,
      () => void chrome.runtime.lastError,
    );
  }

  createFeatureContextMenus(
    featureName: string,
    listeners: ContextMenuListener[],
  ): void {
    chrome.contextMenus.create(
      { id: featureName, title: featureName, contexts: ["all"] },
      () => void chrome.runtime.lastError,
    );
    for (const listener of listeners) {
      chrome.contextMenus.create(
        {
          parentId: featureName,
          id: listener.name,
          title: listener.description,
          contexts: ["all"],
        },
        () => void chrome.runtime.lastError,
      );
    }
  }
}
