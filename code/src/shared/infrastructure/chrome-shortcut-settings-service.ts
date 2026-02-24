export class ChromeShortcutSettingsService {

  async getShortcuts(shortcutNames: Set<string>) {

    if (typeof chrome !== "undefined" && chrome.commands) {
      const chromeShortcuts = await chrome.commands.getAll();

      return chromeShortcuts
        .filter((chromeShortcut) => chromeShortcut.name && shortcutNames.has(chromeShortcut.name))
        .map((chromeShortcut) => ({
          name: chromeShortcut.description || chromeShortcut.name || "Shortcut",
          key: chromeShortcut.shortcut || "Not set",
        }));
    }

    return [];
  }
}