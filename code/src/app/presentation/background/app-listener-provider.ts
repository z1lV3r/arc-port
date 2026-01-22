import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import { ListenersStore } from "@/app/domain/models/listeners-store";

export abstract class AppListenerProvider {
  protected browserService: BrowserService;
  protected listenersStore: ListenersStore;
  constructor(browserService: BrowserService) {
    this.browserService = browserService;
    this.listenersStore = new ListenersStore();
  }
}
