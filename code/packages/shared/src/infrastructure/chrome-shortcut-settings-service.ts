import type { Shortcut } from "../domain/models/shortcut-setting";
import type { ShortcutListener } from "../domain/models/shortcut-listener";

export class ChromeShortcutSettingsService {
  async getShortcuts(shortcuts: ShortcutListener[]): Promise<Shortcut[]> {
    if (typeof chrome === "undefined" || !chrome.commands) {
      return [];
    }

    const shortcutsByName = new Map(shortcuts.map((s) => [s.name, s]));
    const chromeShortcuts = await chrome.commands.getAll();

    return chromeShortcuts
      .filter((cs) => cs.name && shortcutsByName.has(cs.name))
      .map((cs) => {
        const listener = shortcutsByName.get(cs.name!)!;
        return {
          name: cs.description || cs.name || "Shortcut",
          key: cs.shortcut || "Not set",
          defaultKey: listener.key.default || "Not set",
        };
      });
  }
}
