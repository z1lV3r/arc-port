import type { Shortcut } from "@/shared/domain/models/shortcut-setting";

export interface ShortcutSettingsService {
  getShortcuts(shortcutNames: Set<string>): Promise<Shortcut[]>;
}