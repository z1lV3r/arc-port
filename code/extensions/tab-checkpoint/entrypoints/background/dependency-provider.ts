import type { BrowserExtensionService } from "@repo/shared/domain/interfaces/browser-extension-service";
import { ChromeExtensionService } from "@repo/shared/infrastructure/chrome-extension-service";

import type { BrowserContextMenuService } from "./domain/interfaces/browser-context-menu-service";
import type { BrowserMessageEventService } from "./domain/interfaces/browser-message-event-service";
import type { BrowserShortcutService } from "./domain/interfaces/browser-shortcut-service";
import type { BrowserTabEventService } from "./domain/interfaces/browser-tab-event-service";
import ChromeContextMenuService from "./infrastructure/chrome-context-menu-service";
import { ChromeMessageEventService } from "./infrastructure/chrome-message-event-service";
import ChromeShortcutService from "./infrastructure/chrome-shortcut-service";
import ChromeTabEventService from "./infrastructure/chrome-tab-event-service";
import { ContextMenuListenerUseCases } from "./use-cases/context-menu-listener-use-cases";
import { ExtensionListenerUseCases } from "./use-cases/extension-listener-use-cases";
import { MessageEventListenerUseCases } from "./use-cases/message-event-listeners-use-cases";
import { ShortcutListenerUseCases } from "./use-cases/shortcut-listener-use-cases";
import { TabEventListenerUseCases } from "./use-cases/tab-event-listener-use-cases";

export class DependencyProvider {
  private constructor() {}

  //Infrastructure - Browser
  private static browserTabEventService: BrowserTabEventService;
  static getBrowserTabEventService(): BrowserTabEventService {
    if (this.browserTabEventService) {
      return this.browserTabEventService;
    }
    this.browserTabEventService = new ChromeTabEventService();
    return this.browserTabEventService;
  }

  private static browserExtensionService: BrowserExtensionService;
  static getBrowserExtensionService(): BrowserExtensionService {
    if (this.browserExtensionService) {
      return this.browserExtensionService;
    }
    this.browserExtensionService = new ChromeExtensionService();
    return this.browserExtensionService;
  }

  private static browserContextMenuService: BrowserContextMenuService;
  static getBrowserContextMenuService(): BrowserContextMenuService {
    if (this.browserContextMenuService) {
      return this.browserContextMenuService;
    }
    this.browserContextMenuService = new ChromeContextMenuService();
    return this.browserContextMenuService;
  }

  private static browserShortcutService: BrowserShortcutService;
  static getBrowserShortcutService(): BrowserShortcutService {
    if (this.browserShortcutService) {
      return this.browserShortcutService;
    }
    this.browserShortcutService = new ChromeShortcutService();
    return this.browserShortcutService;
  }

  private static browserMessageEventService: BrowserMessageEventService;
  static getBrowserMessageEventService(): BrowserMessageEventService {
    if (this.browserMessageEventService) {
      return this.browserMessageEventService;
    }
    this.browserMessageEventService = new ChromeMessageEventService();
    return this.browserMessageEventService;
  }

  //Use Cases
  private static contextMenuListenerUseCase: ContextMenuListenerUseCases;
  static getContextMenuListenerUseCase(): ContextMenuListenerUseCases {
    if (this.contextMenuListenerUseCase) {
      return this.contextMenuListenerUseCase;
    }
    this.contextMenuListenerUseCase = new ContextMenuListenerUseCases(
      DependencyProvider.getBrowserContextMenuService(),
    );
    return this.contextMenuListenerUseCase;
  }

  private static shortcutListenerUseCase: ShortcutListenerUseCases;
  static getShortcutListenerUseCase(): ShortcutListenerUseCases {
    if (this.shortcutListenerUseCase) {
      return this.shortcutListenerUseCase;
    }
    this.shortcutListenerUseCase = new ShortcutListenerUseCases(
      DependencyProvider.getBrowserShortcutService(),
    );
    return this.shortcutListenerUseCase;
  }

  private static tabEventListenerUseCase: TabEventListenerUseCases;
  static getTabEventListenerUseCase(): TabEventListenerUseCases {
    if (this.tabEventListenerUseCase) {
      return this.tabEventListenerUseCase;
    }
    this.tabEventListenerUseCase = new TabEventListenerUseCases(
      DependencyProvider.getBrowserTabEventService(),
    );
    return this.tabEventListenerUseCase;
  }

  private static extensionListenerUseCase: ExtensionListenerUseCases;
  static getExtensionListenerUseCase(): ExtensionListenerUseCases {
    if (this.extensionListenerUseCase) {
      return this.extensionListenerUseCase;
    }
    this.extensionListenerUseCase = new ExtensionListenerUseCases(
      DependencyProvider.getBrowserExtensionService(),
    );
    return this.extensionListenerUseCase;
  }

  private static useCaseEventListenersUseCases: MessageEventListenerUseCases;
  static getUseCaseEventListenersUseCases(): MessageEventListenerUseCases {
    if (this.useCaseEventListenersUseCases) {
      return this.useCaseEventListenersUseCases;
    }
    this.useCaseEventListenersUseCases = new MessageEventListenerUseCases();
    return this.useCaseEventListenersUseCases;
  }
}
