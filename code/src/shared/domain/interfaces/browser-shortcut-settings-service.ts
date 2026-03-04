import type { Shortcut } from "@/shared/domain/models/shortcut-setting";

export interface BrowserShortcutSettingsService {
  getShortcuts(shortcutNames: Set<string>): Promise<Shortcut[]>;
}