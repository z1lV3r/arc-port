import { ListenersStore } from "@/app/domain/models/listeners-store";
import type { BrowserShortcutService } from "@/app/domain/interfaces/browser-shortcut-service";

export class MockBrowserShortcutService implements BrowserShortcutService {
  public registeredStore: ListenersStore | null = null;

  async registerShortcutListeners(listenersStore: ListenersStore): Promise<void> {
    this.registeredStore = listenersStore;
  }
}