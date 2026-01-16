import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import type { ShortcutListener } from "@/app/domain/models/shortcut-listener";
import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
import { getShortcutListeners as getDefaultUrlShortcutListeners } from "@/features/default-url/presentation/shortcut-listeners";
import { getTabEventListeners as getDefaultUrlTabEventListeners } from "@/features/default-url/presentation/tab-event-listeners";
import { getContextMenus as getDefaultUrlContextMenus } from "@/features/default-url/presentation/context-menu-listeners";

export function registerShortcutListeners(browserService: BrowserService) {
  const shortcutListeners = new Map<string, ShortcutListener>();
  const defaultUrlShortcutListeners = getDefaultUrlShortcutListeners();
  storeListeners(defaultUrlShortcutListeners, shortcutListeners);
  browserService.registerShortcutListeners(shortcutListeners);
}

export function registerTabEventListeners(browserService: BrowserService) {
  const tabEventListeners = new Map<string, TabEventListener>();
  const defaultUrlTabEventListeners = getDefaultUrlTabEventListeners();
  storeListeners(defaultUrlTabEventListeners, tabEventListeners);
  browserService.registerTabEventListeners(tabEventListeners);
}

export function registerContextMenuListeners(browserService: BrowserService) {
  const { featureName: featureName, contextMenus: defaultUrlContextMenus } =
    getDefaultUrlContextMenus();
  browserService.registerContextMenuListeners(
    featureName,
    defaultUrlContextMenus,
  );
}

function storeListeners<T extends { name: string }>(
  newListeners: Map<string, T>,
  targetMap: Map<string, T>,
) {
  newListeners.forEach((listener) => {
    targetMap.set(listener.name, listener);
  });
}
