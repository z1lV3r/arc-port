import type { BrowserContextMenuService } from "./domain/interfaces/browser-context-menu-service";
import type { BrowserTabEventService } from "./domain/interfaces/browser-tab-event-service";
import type { BrowserShortcutService } from "./domain/interfaces/browser-shortcut-service";
import ChromeTabEventService from "./infrastructure/chrome-tab-event-service";
import ChromeContextMenuService from "./infrastructure/chrome-context-menu-service";
import ChromeShortcutService from "./infrastructure/chrome-shortcut-service";
import { ContextMenuListenerUseCase } from "./domain/use-cases/context-menu-listener-use-case";
import { ShortcutListenerUseCase } from "./domain/use-cases/shortcut-listener-use-case";
import { TabEventListenerUseCase } from "./domain/use-cases/tab-event-listener-use-case";

export class DependencyProvider {
  private browserTabEventService: BrowserTabEventService;
  private browserContextMenuService: BrowserContextMenuService;
  private browserShortcutService: BrowserShortcutService;
  private contextMenuListenerUseCase: ContextMenuListenerUseCase;
  private shortcutListenerUseCase: ShortcutListenerUseCase;
  private tabEventListenerUseCase: TabEventListenerUseCase;

  constructor() {
    this.browserTabEventService = new ChromeTabEventService();
    this.browserContextMenuService = new ChromeContextMenuService();
    this.browserShortcutService = new ChromeShortcutService();

    for (const property of Object.keys(this)) {
      if (!(this as any)[property]) {
        throw new Error(`Property ${property} is not initialized`);
      }
    }

    this.contextMenuListenerUseCase = new ContextMenuListenerUseCase(this.getBrowserContextMenuService());
    this.shortcutListenerUseCase = new ShortcutListenerUseCase(this.getBrowserShortcutService());
    this.tabEventListenerUseCase = new TabEventListenerUseCase(this.getBrowserTabEventService());
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
  getContextMenuListenerUseCase(): ContextMenuListenerUseCase {
    return this.contextMenuListenerUseCase;
  }
  getShortcutListenerUseCase(): ShortcutListenerUseCase {
    return this.shortcutListenerUseCase;
  }
  getTabEventListenerUseCase(): TabEventListenerUseCase {
    return this.tabEventListenerUseCase;
  }
}
