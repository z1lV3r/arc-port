import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserStorageEventService {
  registerStorageEventListeners(listenersStore: ListenersStore): Promise<void>;
}