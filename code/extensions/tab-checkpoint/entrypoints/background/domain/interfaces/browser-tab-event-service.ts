import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserTabEventService {
  registerOnCloseTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnUpdateTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnCreateTabEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
