import type { ListenersStore } from "../models/listeners-store";

export interface BrowserContextMenuService {
  registerContextMenuListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
