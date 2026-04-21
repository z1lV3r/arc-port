import type { BrowserTabEventService } from '@/app/domain/interfaces/browser-tab-event-service';
import type { ListenersStore } from '@/app/domain/models/listeners-store';

export class MockBrowserTabEventService implements BrowserTabEventService {
  public onCloseStore: ListenersStore | null = null;
  public onUpdateStore: ListenersStore | null = null;
  public onCreateStore: ListenersStore | null = null;

  async registerOnCloseTabEventListeners(listenersStore: ListenersStore): Promise<void> {
    this.onCloseStore = listenersStore;
  }

  async registerOnUpdateTabEventListeners(listenersStore: ListenersStore): Promise<void> {
    this.onUpdateStore = listenersStore;
  }

  async registerOnCreateTabEventListeners(listenersStore: ListenersStore): Promise<void> {
    this.onCreateStore = listenersStore;
  }
}