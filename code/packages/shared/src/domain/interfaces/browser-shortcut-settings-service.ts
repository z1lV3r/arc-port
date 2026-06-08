import type { Shortcut } from "../models/shortcut-setting";
import type { ShortcutListener } from "../models/shortcut-listener";

export interface BrowserShortcutSettingsService {
  getShortcuts(shortcutNames: ShortcutListener[]): Promise<Shortcut[]>;
}
