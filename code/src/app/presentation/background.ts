import type { Shortcut } from "@/app/domain/shortcut";
import type { TabEventListener } from "@/app/domain/tab-event-listener";
import { getDependencies } from "@/app/dependency-provider";
import { getShortcuts as getDefaultUrlShortcuts } from "@/features/default-url/presentation/shortcuts";
import { getDefaultUrlBrowserTabEventListeners } from "@/features/default-url/presentation/tab-event-listeners";
import type { BrowserService } from "@/app/domain/interfaces/browser-service";

const shortcuts = new Map<string, Shortcut>();
const tabEventListeners = new Map<string, TabEventListener>();

export function registerShortcuts() {
  const defaultUrlShortcuts = getDefaultUrlShortcuts();
  storeShortcut(defaultUrlShortcuts);
  const dependencies = getDependencies();
  const browserService = dependencies.get("browserService") as BrowserService;
  browserService.registerShortcuts(shortcuts);
}

function storeShortcut(newShortcuts: Map<string, Shortcut>) {
  newShortcuts.forEach((shortcut) => {
    shortcuts.set(shortcut.name, shortcut);
  });
}

export function registerTabEventListeners() {
  const defaultUrlTabEventListeners = getDefaultUrlBrowserTabEventListeners();
  storeTabEventListener(defaultUrlTabEventListeners);
  const dependencies = getDependencies();
  const browserService = dependencies.get("browserService") as BrowserService;
  browserService.registerTabEventListeners(tabEventListeners);
}

function storeTabEventListener(newTabEventListeners: Map<string, TabEventListener>) {
  newTabEventListeners.forEach((tabEventListener) => {
    tabEventListeners.set(tabEventListener.name, tabEventListener);
  });
}
