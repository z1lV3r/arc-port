import type { Shortcut } from "@/shared/domain/models/shortcut-setting";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";

export interface BrowserShortcutSettingsService {
  getShortcuts(shortcutNames: ShortcutListener[]): Promise<Shortcut[]>;
}