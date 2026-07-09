import type { BrowserExtensionService } from "@repo/shared/domain/interfaces/browser-extension-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ChromeExtensionService } from "@repo/shared/infrastructure/chrome-extension-service";
import { ChromeStorageSettingsRepository } from "@repo/shared/infrastructure/chrome-storage-settings-repository";

import type { BrowserContextMenuService } from "./domain/interfaces/browser-context-menu-service";
import type { BrowserMessageEventService } from "./domain/interfaces/browser-message-event-service";
import type { BrowserShortcutService } from "./domain/interfaces/browser-shortcut-service";
import { BrowserStorageEventService } from "./domain/interfaces/browser-storage-event-service";
import type { BrowserTabEventService } from "./domain/interfaces/browser-tab-event-service";
import ChromeContextMenuService from "./infrastructure/chrome-context-menu-service";
import { ChromeMessageEventService } from "./infrastructure/chrome-message-event-service";
import ChromeShortcutService from "./infrastructure/chrome-shortcut-service";
import { ChromeStorageEventService } from "./infrastructure/chrome-storage-event-service";
import ChromeTabEventService from "./infrastructure/chrome-tab-event-service";
import { ContextMenuListenerUseCases } from "./use-cases/context-menu-listener-use-cases";
import { ExtensionListenerUseCases } from "./use-cases/extension-listener-use-cases";
import { MessageEventListenerUseCases } from "./use-cases/message-event-listeners-use-cases";
import { SettingChangeEventListenerUseCases } from "./use-cases/settings-listener-use-cases";
import { ShortcutListenerUseCases } from "./use-cases/shortcut-listener-use-cases";
import { StorageListenerUseCases } from "./use-cases/storage-listener-use-cases";
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

  private static browserStorageEventService: BrowserStorageEventService;
  static getBrowserStorageEventService(): BrowserStorageEventService {
    if (this.browserStorageEventService) {
      return this.browserStorageEventService;
    }
    this.browserStorageEventService = new ChromeStorageEventService();
    return this.browserStorageEventService;
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

  //Infrastructure - Data
  private static settingsRepository: SettingsRepository;
  static getSettingsRepository(): SettingsRepository {
    if (this.settingsRepository) {
      return this.settingsRepository;
    }
    this.settingsRepository = new ChromeStorageSettingsRepository();
    return this.settingsRepository;
  }

  //Use Cases
  private static storageListenerUseCase: StorageListenerUseCases;
  static getStorageListenerUseCase(): StorageListenerUseCases {
    if (this.storageListenerUseCase) {
      return this.storageListenerUseCase;
    }
    this.storageListenerUseCase = new StorageListenerUseCases(
      DependencyProvider.getBrowserStorageEventService(),
    );
    return this.storageListenerUseCase;
  }

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

  private static settingChangeEventListenersUseCases: SettingChangeEventListenerUseCases;
  static getSettingChangeEventListenersUseCases(): SettingChangeEventListenerUseCases {
    if (this.settingChangeEventListenersUseCases) {
      return this.settingChangeEventListenersUseCases;
    }
    this.settingChangeEventListenersUseCases =
      new SettingChangeEventListenerUseCases(
        DependencyProvider.getBrowserStorageEventService(),
      );
    return this.settingChangeEventListenersUseCases;
  }
}
