import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserShortcutService {
  registerShortcutListeners(listenersStore: ListenersStore): Promise<void>;
}
