import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserTabEventService {
  registerOnTabActivatedEventListeners(
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
}
