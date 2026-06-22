import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserStorageEventService {
  registerSettingChangeEventListeners(
    listenersStore: ListenersStore,
  ): Promise<void>;
  registerStorageEventListeners(listenersStore: ListenersStore): Promise<void>;
}
