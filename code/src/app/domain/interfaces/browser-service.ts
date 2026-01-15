import type { Shortcut } from "../shortcut";
import type { TabEventListener } from "../tab-event-listener";

export interface BrowserService {
  registerShortcuts(shortcuts: Map<string, Shortcut>): Promise<void>;
  registerTabEventListeners(
    tabEventListeners: Map<string, TabEventListener>,
  ): Promise<void>;
}
