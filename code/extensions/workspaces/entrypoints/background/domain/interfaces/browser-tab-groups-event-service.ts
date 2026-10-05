import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserTabGroupsEventService {
  registerOnTabGroupChangedEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnTabGroupCreatedEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnTabGroupMovedEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerOnTabGroupRemovedEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
}
