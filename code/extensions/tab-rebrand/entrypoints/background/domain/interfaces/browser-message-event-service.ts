import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

export interface BrowserMessageEventService {
  registerMessageEventListeners(listenersStore: ListenersStore): Promise<void>;
}
