import type { Shortcut } from "../shortcut";

export interface BrowserService {
  registerShortcuts(shortcuts: Map<string, Shortcut>): Promise<void>;
}