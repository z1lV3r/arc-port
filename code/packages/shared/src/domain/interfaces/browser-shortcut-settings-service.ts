import type { ShortcutListener } from "../models/shortcut-listener";
import type { Shortcut } from "../models/shortcut-setting";

export interface BrowserShortcutSettingsService {
  getShortcuts(shortcutNames: ShortcutListener[]): Promise<Shortcut[]>;
}
