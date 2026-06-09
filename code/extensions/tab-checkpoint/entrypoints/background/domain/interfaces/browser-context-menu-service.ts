import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserContextMenuService {
  registerContextMenuListeners(listenersStore: ListenersStore): Promise<void>;
}
