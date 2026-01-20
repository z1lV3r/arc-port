import type { ContextMenuListener } from "../models/context-menu-listener";
import type { ShortcutListener } from "../models/shortcut-listener";
import type { TabEventListener } from "../models/tab-event-listener";

export interface BrowserService {
  registerShortcutListeners(
    shortcuts: Map<string, ShortcutListener>,
  ): Promise<void>;
  registerOnCloseTabEventListeners(
    tabEventListeners: Map<string, TabEventListener>,
  ): Promise<void>;
  registerOnUpdateTabEventListeners(
    tabEventListeners: Map<string, TabEventListener>,
  ): Promise<void>;
  registerOnCreateTabEventListeners(
    tabEventListeners: Map<string, TabEventListener>,
  ): Promise<void>;
  registerContextMenuListeners(
    featureName: string,
    contextMenuListeners: Map<string, ContextMenuListener>,
  ): Promise<void>;
}
