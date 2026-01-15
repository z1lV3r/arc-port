import type { ShortcutListener } from "../models/shortcut-listener";
import type { TabEventListener } from "../models/tab-event-listener";

export interface BrowserService {
  registerShortcutListeners(
    shortcuts: Map<string, ShortcutListener>,
  ): Promise<void>;
  registerTabEventListeners(
    tabEventListeners: Map<string, TabEventListener>,
  ): Promise<void>;
}
