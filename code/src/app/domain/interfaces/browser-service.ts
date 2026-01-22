import type { ListenersStore } from "../models/listeners-store";

export interface BrowserService {
  registerShortcutListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnCloseTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnUpdateTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnCreateTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerContextMenuListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
