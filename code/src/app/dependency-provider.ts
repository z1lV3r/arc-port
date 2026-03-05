import type { BrowserContextMenuService } from "./domain/interfaces/browser-context-menu-service";
import type { BrowserTabEventService } from "./domain/interfaces/browser-tab-event-service";
import type { BrowserShortcutService } from "./domain/interfaces/browser-shortcut-service";
import ChromeTabEventService from "./infrastructure/chrome-tab-event-service";
import ChromeContextMenuService from "./infrastructure/chrome-context-menu-service";
import ChromeShortcutService from "./infrastructure/chrome-shortcut-service";
import { ContextMenuListenerUseCases } from "./use-cases/context-menu-listener-use-cases";
import { ShortcutListenerUseCases } from "./use-cases/shortcut-listener-use-cases";
import { TabEventListenerUseCases } from "./use-cases/tab-event-listener-use-cases";
import { ExtensionListenerUseCases } from "./use-cases/extension-listener-use-cases";
import type { BrowserExtensionService } from "@/shared/domain/interfaces/browser-extension-service";
import { ChromeExtensionService } from "@/shared/infrastructure/chrome-extension-service";

export class DependencyProvider {
  private browserTabEventService: BrowserTabEventService;
  private browserContextMenuService: BrowserContextMenuService;
  private browserShortcutService: BrowserShortcutService;
  private browserExtensionService: BrowserExtensionService;
  private contextMenuListenerUseCase: ContextMenuListenerUseCases;
  private shortcutListenerUseCase: ShortcutListenerUseCases;
  private tabEventListenerUseCase: TabEventListenerUseCases;
  private extensionListenerUseCase: ExtensionListenerUseCases;

  constructor() {
    this.browserTabEventService = new ChromeTabEventService();
    this.browserContextMenuService = new ChromeContextMenuService();
    this.browserShortcutService = new ChromeShortcutService();
    this.browserExtensionService = new ChromeExtensionService();

    for (const property of Object.keys(this)) {
      if (!(this as any)[property]) {
        throw new Error(`Property ${property} is not initialized`);
      }
    }

    this.contextMenuListenerUseCase = new ContextMenuListenerUseCases(this.getBrowserContextMenuService());
    this.shortcutListenerUseCase = new ShortcutListenerUseCases(this.getBrowserShortcutService());
    this.tabEventListenerUseCase = new TabEventListenerUseCases(this.getBrowserTabEventService());
    this.extensionListenerUseCase = new ExtensionListenerUseCases(this.getBrowserExtensionService());
  }
  getBrowserTabEventService(): BrowserTabEventService {
    return this.browserTabEventService;
  }
  getBrowserExtensionService(): BrowserExtensionService {
    return this.browserExtensionService;
  }
  getBrowserContextMenuService(): BrowserContextMenuService {
    return this.browserContextMenuService;
  }
  getBrowserShortcutService(): BrowserShortcutService {
    return this.browserShortcutService;
  }
  getContextMenuListenerUseCase(): ContextMenuListenerUseCases {
    return this.contextMenuListenerUseCase;
  }
  getShortcutListenerUseCase(): ShortcutListenerUseCases {
    return this.shortcutListenerUseCase;
  }
  getTabEventListenerUseCase(): TabEventListenerUseCases {
    return this.tabEventListenerUseCase;
  }
  getExtensionListenerUseCase(): ExtensionListenerUseCases {
    return this.extensionListenerUseCase;
  }
}
