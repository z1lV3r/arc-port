import type { ListenersStore } from "../models/listeners-store";

export interface BrowserExtensionService {
  registerOnExtensionInstalledListeners(listenersStore: ListenersStore): void;
}
