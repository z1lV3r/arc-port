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
  private static browserName: string;
  private static browserTabEventService: BrowserTabEventService;
  private static browserContextMenuService: BrowserContextMenuService;
  private static browserShortcutService: BrowserShortcutService;
  private static browserExtensionService: BrowserExtensionService;
  private static contextMenuListenerUseCase: ContextMenuListenerUseCases;
  private static shortcutListenerUseCase: ShortcutListenerUseCases;
  private static tabEventListenerUseCase: TabEventListenerUseCases;
  private static extensionListenerUseCase: ExtensionListenerUseCases;

  private constructor(){
  }

  private static getBrowserName(): string {
    if (this.browserName) {
      return this.browserName;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    this.browserName = userAgent.includes("firefox") ? "firefox" : "chrome";
    return this.browserName;
  }

  static getBrowserTabEventService(): BrowserTabEventService {
    if(this.browserTabEventService) {
          return this.browserTabEventService;
        }
    
        if (DependencyProvider.getBrowserName() === "chrome") {
          this.browserTabEventService = new ChromeTabEventService();
        } else {
          throw new Error("Unsupported browser");
        }
    return this.browserTabEventService;
  }

  static getBrowserExtensionService(): BrowserExtensionService {
    if(this.browserExtensionService) {
          return this.browserExtensionService;
        }
    
        if (DependencyProvider.getBrowserName() === "chrome") {
          this.browserExtensionService = new ChromeExtensionService();
        } else {
          throw new Error("Unsupported browser");
        }
    return this.browserExtensionService;
  }

  static getBrowserContextMenuService(): BrowserContextMenuService {
    if(this.browserContextMenuService) {
          return this.browserContextMenuService;
        }
    
        if (DependencyProvider.getBrowserName() === "chrome") {
          this.browserContextMenuService = new ChromeContextMenuService();
        } else {
          throw new Error("Unsupported browser");
        }
    return this.browserContextMenuService;
  }

  static getBrowserShortcutService(): BrowserShortcutService {
    if(this.browserShortcutService) {
          return this.browserShortcutService;
        }
    
        if (DependencyProvider.getBrowserName() === "chrome") {
          this.browserShortcutService = new ChromeShortcutService();
        } else {
          throw new Error("Unsupported browser");
        }
    return this.browserShortcutService;
  }

  static getContextMenuListenerUseCase(): ContextMenuListenerUseCases {
    if(this.contextMenuListenerUseCase) {
      return this.contextMenuListenerUseCase;
    }
    this.contextMenuListenerUseCase = new ContextMenuListenerUseCases(DependencyProvider.getBrowserContextMenuService());
    return this.contextMenuListenerUseCase;
  }

  static getShortcutListenerUseCase(): ShortcutListenerUseCases {
    if(this.shortcutListenerUseCase) {
      return this.shortcutListenerUseCase;
    }
    this.shortcutListenerUseCase = new ShortcutListenerUseCases(DependencyProvider.getBrowserShortcutService());
    return this.shortcutListenerUseCase;
  }
  static getTabEventListenerUseCase(): TabEventListenerUseCases {
    if(this.tabEventListenerUseCase) {
      return this.tabEventListenerUseCase;
    }
    this.tabEventListenerUseCase = new TabEventListenerUseCases(DependencyProvider.getBrowserTabEventService());
    return this.tabEventListenerUseCase;
  }
  static getExtensionListenerUseCase(): ExtensionListenerUseCases {
    if(this.extensionListenerUseCase) {
      return this.extensionListenerUseCase;
    }
    this.extensionListenerUseCase = new ExtensionListenerUseCases(DependencyProvider.getBrowserExtensionService());
    return this.extensionListenerUseCase;
  }
}
