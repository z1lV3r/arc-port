import type { BrowserService } from "@/app/domain/interfaces/browser-service";

export abstract class AppListenerProvider {
  protected browserService: BrowserService;
  constructor(browserService: BrowserService) {
    this.browserService = browserService;
  }

  storeListeners<T extends { name: string }>(
    newListeners: Map<string, T>,
    targetMap: Map<string, T>,
  ) {
    newListeners.forEach((listener) => {
      targetMap.set(listener.name, listener);
    });
  }
}
