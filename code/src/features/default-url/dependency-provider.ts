import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "./infrastructure/chrome-storage-default-url-repository";
import { SetDefaultUrlUseCases } from "./use-cases/set-default-url-use-cases";
import { ResetTabToDefaultUrlUseCases } from "./use-cases/reset-tab-to-default-url-use-cases";
import { GetDefaultUrlUseCases } from "./use-cases/get-default-url-use-cases";
import { ClearDefaultUrlUseCases } from "./use-cases/clear-default-url-use-cases";
import type { TabsService } from "@/shared/domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "./domain/interfaces/default-url-repository";
import { ChromeShortcutSettingsService } from "@/shared/infrastructure/chrome-shortcut-settings-service";
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";
import { ChromeStorageSettingsRepository } from "@/shared/infrastructure/chrome-storage-settings-repository";
import { SettingsUseCases } from "./use-cases/settings-use-cases";
import { ResetCurrentTabToDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/reset-current-tab-to-default-url-context-menu-listener";
import { SetCurrentTabDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/set-current-tab-default-url-context-menu-listener";
import { ClearCurrentTabDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/clear-current-tab-default-url-context-menu-listener";
import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/set-current-tab-default-url-shortcut-listener";
import { ClearCurrentTabDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/clear-current-tab-default-url-shortcut-listener";
import { ResetCurrentTabToDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/reset-current-tab-to-default-url-shortcut-listener";
import { ResetOrCloseCurrentTabToDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/reset-or-close-current-tab-to-default-url-shortcut-listener";
import { OnTabCloseRemoveDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-close-delete-default-url";
import { OnTabPinSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-pin-set-default-url";
import { OnTabSetToGroupSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-set-to-group-set-default-url";
import { OnTabCreatePinnedSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-create-pinned-set-default-url";
import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import { ChromeContextMenuService } from "@/shared/infrastructure/chrome-context-menu-service";
import type { BrowserContextMenuService } from "@/shared/domain/interfaces/browser-context-menu-service";
import type { ExtensionListener } from "@/shared/domain/models/extension-listener";
import { OnExtensionInstalledLoadDefaultSettings } from "./presentation/background/extension-listeners/on-extension-installed-load-default-settings";

export class DefaultUrlDependencyProvider {
  private static tabsService: TabsService;
  private static defaultUrlRepository: DefaultUrlRepository;
  private static setDefaultUrlUseCases: SetDefaultUrlUseCases;
  private static resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  private static getDefaultUrlUseCases: GetDefaultUrlUseCases;
  private static clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  private static shortcutSettingsService: BrowserShortcutSettingsService;
  private static settingsRepository: SettingsRepository;
  private static browserContextMenuService: BrowserContextMenuService;
  private static settingsUseCases: SettingsUseCases;
  private static contextMenuListeners: ContextMenuListener[];
  private static shortcutListeners: ShortcutListener[];
  private static onCloseTabEventListeners: TabEventListener[];
  private static onUpdateTabEventListeners: TabEventListener[];
  private static onCreateTabEventListeners: TabEventListener[];
  private static onExtensionInstalledListeners: ExtensionListener[];
  private static browserName: string;

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

  static getTabsService(): TabsService {
    if(this.tabsService) {
      return this.tabsService;
    }

    if (DefaultUrlDependencyProvider.getBrowserName() === "chrome") {
      this.tabsService = new ChromeTabsService();
    } else {
      throw new Error("Unsupported browser");
    }

    return this.tabsService;
  }

  static getDefaultUrlRepository(): DefaultUrlRepository {
    if(this.defaultUrlRepository) {
      return this.defaultUrlRepository;
    }

    if (DefaultUrlDependencyProvider.getBrowserName() === "chrome") {
      this.defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
    } else {
      throw new Error("Unsupported browser");
    }

    return this.defaultUrlRepository;
  }

  static getShortcutSettingsService(): BrowserShortcutSettingsService {
    if(this.shortcutSettingsService) {
      return this.shortcutSettingsService;
    }

    if (DefaultUrlDependencyProvider.getBrowserName() === "chrome") {
      this.shortcutSettingsService = new ChromeShortcutSettingsService();
    } else {
      throw new Error("Unsupported browser");
    }

    return this.shortcutSettingsService;
  }

  static getSettingsRepository(): SettingsRepository {
    if(this.settingsRepository) {
      return this.settingsRepository;
    }

    if (DefaultUrlDependencyProvider.getBrowserName() === "chrome") {
      this.settingsRepository = new ChromeStorageSettingsRepository();
    } else {
      throw new Error("Unsupported browser");
    }

    return this.settingsRepository;
  }

  static getBrowserContextMenuService(): BrowserContextMenuService {
    if(this.browserContextMenuService) {
      return this.browserContextMenuService;
    }

    if (DefaultUrlDependencyProvider.getBrowserName() === "chrome") {
      this.browserContextMenuService = new ChromeContextMenuService();
    } else {
      throw new Error("Unsupported browser");
    }

    return this.browserContextMenuService;
  }

  static getSetDefaultUrlUseCases(): SetDefaultUrlUseCases {
    if(this.setDefaultUrlUseCases) {
      return this.setDefaultUrlUseCases;
    }

    this.setDefaultUrlUseCases = new SetDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.setDefaultUrlUseCases;
  }

  static getResetTabToDefaultUrlUseCases(): ResetTabToDefaultUrlUseCases {
    if(this.resetTabToDefaultUrlUseCases) {
      return this.resetTabToDefaultUrlUseCases;
    }

    this.resetTabToDefaultUrlUseCases = new ResetTabToDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.resetTabToDefaultUrlUseCases;
  }

  static getGetDefaultUrlUseCases(): GetDefaultUrlUseCases {
    if(this.getDefaultUrlUseCases) {
      return this.getDefaultUrlUseCases;
    }

    this.getDefaultUrlUseCases = new GetDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.getDefaultUrlUseCases;
  }

  static getClearDefaultUrlUseCases(): ClearDefaultUrlUseCases {
    if(this.clearDefaultUrlUseCases) {
      return this.clearDefaultUrlUseCases;
    }

    this.clearDefaultUrlUseCases = new ClearDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.clearDefaultUrlUseCases;
  }

  static getSettingsUseCases(): SettingsUseCases {
    if(this.settingsUseCases) {
      return this.settingsUseCases;
    }

    this.settingsUseCases = new SettingsUseCases(
      DefaultUrlDependencyProvider.getSettingsRepository(),
      DefaultUrlDependencyProvider.getBrowserContextMenuService(),
      DefaultUrlDependencyProvider.getContextMenuListeners(),
    );

    return this.settingsUseCases;
  }

  static getContextMenuListeners(): ContextMenuListener[] {
    if(this.contextMenuListeners) {
      return this.contextMenuListeners;
    }

    this.contextMenuListeners = [
      new SetCurrentTabDefaultUrlContextMenuListener(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
      new ResetCurrentTabToDefaultUrlContextMenuListener(DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases()),
      new ClearCurrentTabDefaultUrlContextMenuListener(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
    ];

    DefaultUrlDependencyProvider.getSettingsUseCases();

    return this.contextMenuListeners;
  }

  static getShortcutListeners(): ShortcutListener[] {
    if(this.shortcutListeners) {
      return this.shortcutListeners;
    }

    this.shortcutListeners = [
      new SetCurrentTabDefaultUrlShortcutListener(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
      new ClearCurrentTabDefaultUrlShortcutListener(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
      new ResetCurrentTabToDefaultUrlShortcutListener(DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases()),
      new ResetOrCloseCurrentTabToDefaultUrlShortcutListener(DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases()),
    ];

    return this.shortcutListeners;
  }

  static getOnCloseTabEventListeners(): TabEventListener[] {
    if(this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
      new OnTabCloseRemoveDefaultUrl(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
    ];

    return this.onCloseTabEventListeners;
  }

  static getOnUpdateTabEventListeners(): TabEventListener[] {
    if(this.onUpdateTabEventListeners) {
      return this.onUpdateTabEventListeners;
    }

    this.onUpdateTabEventListeners = [
      new OnTabPinSetDefaultUrl(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
      new OnTabSetToGroupSetDefaultUrl(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
    ];

    return this.onUpdateTabEventListeners;
  }

  static getOnCreateTabEventListeners(): TabEventListener[] {
    if(this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetDefaultUrl(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
    ];

    return this.onCreateTabEventListeners;
  }

  static getOnExtensionInstalledListeners(): ExtensionListener[] {
    if(this.onExtensionInstalledListeners) {
      return this.onExtensionInstalledListeners;
    }

    this.onExtensionInstalledListeners = [
      new OnExtensionInstalledLoadDefaultSettings(DefaultUrlDependencyProvider.getSettingsUseCases()),
    ];

    return this.onExtensionInstalledListeners;
  }
}
