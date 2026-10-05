import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserWindowEventService {
  registerOnFocusedWindowEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnCreatedWindowEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnRemovedWindowEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
