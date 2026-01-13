import { getShortcuts as getDefaultUrlShortcuts } from "@/features/default-url/presentation/shortcuts";
import type { Shortcut } from "@/app/domain/shortcut";

const shortcuts = new Map<string, Shortcut>();

export function registerShortcuts() {
  const defaultUrlShortcuts = getDefaultUrlShortcuts();
  registerShortcut(defaultUrlShortcuts);

  chrome.commands.onCommand.addListener((shortcutName) => {
    const shortcut = shortcuts.get(shortcutName);
    if (shortcut) {
      shortcut.command();
    }
  });
}

function registerShortcut(newShortcuts: Map<string, Shortcut>) {
  newShortcuts.forEach((shortcut) => {
    shortcuts.set(shortcut.name, shortcut);
  });
}
