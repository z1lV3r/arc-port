import type { BrowserContextMenuService } from "@/app/domain/interfaces/browser-context-menu-service";
import type { ListenersStore } from "@/app/domain/models/listeners-store";

export class MockBrowserContextMenuService implements BrowserContextMenuService {
  public registeredStore: ListenersStore | null = null;
  
  async registerContextMenuListeners(listenersStore: ListenersStore): Promise<void> {
    this.registeredStore = listenersStore;
  }
}