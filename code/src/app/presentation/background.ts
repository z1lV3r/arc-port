import type { Shortcut } from "@/app/domain/shortcut";
import { getDependencies } from "@/app/dependency-provider";
import { getShortcuts as getDefaultUrlShortcuts } from "@/features/default-url/presentation/shortcuts";

const shortcuts = new Map<string, Shortcut>();

export function registerShortcuts() {
  const defaultUrlShortcuts = getDefaultUrlShortcuts();
  storeShortcut(defaultUrlShortcuts);
  const dependencies = getDependencies();
  const browserService = dependencies.get("browserService");
  browserService.registerShortcuts(shortcuts);
}

function storeShortcut(newShortcuts: Map<string, Shortcut>) {
  newShortcuts.forEach((shortcut) => {
    shortcuts.set(shortcut.name, shortcut);
  });
}
