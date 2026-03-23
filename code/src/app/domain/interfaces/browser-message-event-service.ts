import type { ListenersStore } from "../models/listeners-store";

export interface BrowserMessageEventService {
    registerMessageEventListeners(listenersStore: ListenersStore): Promise<void>;
}