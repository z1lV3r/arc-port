import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { BrowserShortcutSettingsService } from "@repo/shared/domain/interfaces/browser-shortcut-settings-service";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ChromeBrowserExtensionActionService } from "@repo/shared/infrastructure/chrome-browser-extension-action-service";
import { ChromeContextMenuService } from "@repo/shared/infrastructure/chrome-context-menu-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { ChromeShortcutSettingsService } from "@repo/shared/infrastructure/chrome-shortcut-settings-service";
import { ChromeStorageSettingsRepository } from "@repo/shared/infrastructure/chrome-storage-settings-repository";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";
import { ChromeTabGroupService } from "@repo/shared/infrastructure/chrome-tab-group-service";
import { ChromeWindowService } from "@repo/shared/infrastructure/chrome-window-service";

export class BrowserDependencyProvider {
  private static browserMessageService: BrowserMessageService;
  static getBrowserMessageService(): BrowserMessageService {
    if (this.browserMessageService) {
      return this.browserMessageService;
    }

    this.browserMessageService = new ChromeMessageService();
    return this.browserMessageService;
  }

  private static browserTabsService: BrowserTabsService;
  static getBrowserTabsService(): BrowserTabsService {
    if (this.browserTabsService) {
      return this.browserTabsService;
    }

    this.browserTabsService = new ChromeTabsService();
    return this.browserTabsService;
  }

  private static browserTabGroupsService: BrowserTabGroupService;
  static getBrowserTabGroupsService(): BrowserTabGroupService {
    if (this.browserTabGroupsService) {
      return this.browserTabGroupsService;
    }

    this.browserTabGroupsService = new ChromeTabGroupService();
    return this.browserTabGroupsService;
  }

  private static browserWindowsService: BrowserWindowService;
  static getBrowserWindowService(): BrowserWindowService {
    if (this.browserWindowsService) {
      return this.browserWindowsService;
    }

    this.browserWindowsService = new ChromeWindowService();
    return this.browserWindowsService;
  }

  private static browserShortcutSettingsService: BrowserShortcutSettingsService;
  static getShortcutSettingsService(): BrowserShortcutSettingsService {
    if (this.browserShortcutSettingsService) {
      return this.browserShortcutSettingsService;
    }

    this.browserShortcutSettingsService = new ChromeShortcutSettingsService();
    return this.browserShortcutSettingsService;
  }

  private static settingsRepository: SettingsRepository;
  static getSettingsRepository(): SettingsRepository {
    if (this.settingsRepository) {
      return this.settingsRepository;
    }

    this.settingsRepository = new ChromeStorageSettingsRepository();
    return this.settingsRepository;
  }

  private static browserContextMenuService: BrowserContextMenuService;
  static getBrowserContextMenuService(): BrowserContextMenuService {
    if (this.browserContextMenuService) {
      return this.browserContextMenuService;
    }

    this.browserContextMenuService = new ChromeContextMenuService();
    return this.browserContextMenuService;
  }

  private static browserExtensionActionService: BrowserExtensionActionService;
  static getBrowserExtensionActionService(): BrowserExtensionActionService {
    if (this.browserExtensionActionService) {
      return this.browserExtensionActionService;
    }

    this.browserExtensionActionService =
      new ChromeBrowserExtensionActionService();
    return this.browserExtensionActionService;
  }
}
