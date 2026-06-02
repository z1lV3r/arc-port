import type { ListenersStore } from "@/app/domain/models/listeners-store";

export interface BrowserExtensionService {
  registerOnExtensionInstalledListeners(listenersStore: ListenersStore): void;
}
