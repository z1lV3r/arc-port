import type { BrowserContextMenuService } from "./domain/interfaces/browser-context-menu-service";
import type { BrowserTabEventService } from "./domain/interfaces/browser-tab-event-service";
import type { BrowserShortcutService } from "./domain/interfaces/browser-shortcut-service";
import ChromeTabEventService from "./infrastructure/chrome-tab-event-service";
import ChromeContextMenuService from "./infrastructure/chrome-context-menu-service";
import ChromeShortcutService from "./infrastructure/chrome-shortcut-service";

export class DependencyProvider {
  private browserTabEventService: BrowserTabEventService;
  private browserContextMenuService: BrowserContextMenuService;
  private browserShortcutService: BrowserShortcutService;

  constructor() {
    this.browserTabEventService = new ChromeTabEventService();
    this.browserContextMenuService = new ChromeContextMenuService();
    this.browserShortcutService = new ChromeShortcutService();

    for (const property of Object.keys(this)) {
      if (!(this as any)[property]) {
        throw new Error(`Property ${property} is not initialized`);
      }
    }
  }
  getBrowserTabEventService(): BrowserTabEventService {
    return this.browserTabEventService;
  }
  getBrowserContextMenuService(): BrowserContextMenuService {
    return this.browserContextMenuService;
  }
  getBrowserShortcutService(): BrowserShortcutService {
    return this.browserShortcutService;
  }
}
