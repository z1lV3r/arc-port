import type { ListenersStore } from "../models/listeners-store";

export interface BrowserShortcutService {
  registerShortcutListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
