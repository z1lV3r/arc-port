import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "./infrastructure/chrome-storage-default-url-repository";
import { SetDefaultUrlUseCases } from "./use-cases/set-default-url-use-cases";
import { ResetTabToDefaultUrlUseCases } from "./use-cases/reset-tab-to-default-url-use-cases";
import { GetDefaultUrlUseCases } from "./use-cases/get-default-url-use-cases";
import { ClearDefaultUrlUseCases } from "./use-cases/clear-default-url-use-cases";
import { ClearDefaultUrlMessageEventSender } from "./presentation/background/message-events/clear-default-url-message-event-sender";
import type { BrowserTabsService as BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
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
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service"
import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ClearCurrentTabDefaultUrlMessageEventListener } from "./presentation/background/message-events/clear-default-url-use-cases-listeners/clear-current-tab-default-url-message-event-listener";
import { ClearTabDefaultUrlMessageEventListener } from "./presentation/background/message-events/clear-default-url-use-cases-listeners/clear-tab-default-url-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import { SetCurrentTabDefaultUrlMessageEventListener } from "./presentation/background/message-events/set-default-url-use-cases-listeners/set-current-tab-default-url-message-event-listener";
import { SetDefaultUrlMessageEventSender } from "./presentation/background/message-events/set-default-url-message-event-sender";
import { ResetCurrentTabToDefaultUrlMessageEventListener } from "./presentation/background/message-events/reset-tab-to-default-url-use-cases-listeners/reset-current-tab-to-default-url-message-event-listener";
import { ResetTabToDefaultUrlMessageEventSender } from "./presentation/background/message-events/reset-tab-to-default-url-message-event-sender";
import { GetCurrentTabDefaultUrlMessageEventListener } from "./presentation/background/message-events/get-default-url-use-cases-listeners/get-current-tab-default-url-message-event-listener";
import { GetDefaultUrlMessageEventSender } from "./presentation/background/message-events/get-default-url-message-event-sender";
import { ResetOrCloseCurrentTabToDefaultUrlMessageEventListener } from "./presentation/background/message-events/reset-tab-to-default-url-use-cases-listeners/reset-or-close-current-tab-to-default-url-message-event-listener";
import { SetTabDefaultUrlIfUnsetMessageEventListener } from "./presentation/background/message-events/set-default-url-use-cases-listeners/set-tab-default-url-if-unset-message-event-listener";

export class DefaultUrlDependencyProvider {

  private constructor(){
  }

  //Infrastructure - Data
  private static defaultUrlRepository: DefaultUrlRepository;
  static getDefaultUrlRepository(): DefaultUrlRepository {
    if(this.defaultUrlRepository) {
      return this.defaultUrlRepository;
    }

    this.defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
    return this.defaultUrlRepository;
  }

  private static settingsRepository: SettingsRepository;
  static getSettingsRepository(): SettingsRepository {
    if(this.settingsRepository) {
      return this.settingsRepository;
    }

    this.settingsRepository = new ChromeStorageSettingsRepository();
    return this.settingsRepository;
  }

  //Infrastructure - Browser
  private static browserTabsService: BrowserTabsService;
  static getBrowserTabsService(): BrowserTabsService {
    if(this.browserTabsService) {
      return this.browserTabsService;
    }

    this.browserTabsService = new ChromeTabsService();
    return this.browserTabsService;
  }

  private static browserShortcutSettingsService: BrowserShortcutSettingsService;
  static getBrowserShortcutSettingsService(): BrowserShortcutSettingsService {
    if(this.browserShortcutSettingsService) {
      return this.browserShortcutSettingsService;
    }

    this.browserShortcutSettingsService = new ChromeShortcutSettingsService();
    return this.browserShortcutSettingsService;
  }

  private static browserContextMenuService: BrowserContextMenuService;
  static getBrowserContextMenuService(): BrowserContextMenuService {
    if(this.browserContextMenuService) {
      return this.browserContextMenuService;
    }

    this.browserContextMenuService = new ChromeContextMenuService();
    return this.browserContextMenuService;
  }

  private static browserMessageService: BrowserMessageService;
  static getBrowserMessageService(): BrowserMessageService {
    if(this.browserMessageService) {
      return this.browserMessageService;
    }

    this.browserMessageService = new ChromeMessageService();
    return this.browserMessageService;
  }

  //Use cases
  private static setDefaultUrlUseCases: SetDefaultUrlUseCases;
  static getSetDefaultUrlUseCases(): SetDefaultUrlUseCases {
    if(this.setDefaultUrlUseCases) {
      return this.setDefaultUrlUseCases;
    }

    this.setDefaultUrlUseCases = new SetDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getBrowserTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.setDefaultUrlUseCases;
  }

  private static resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  static getResetTabToDefaultUrlUseCases(): ResetTabToDefaultUrlUseCases {
    if(this.resetTabToDefaultUrlUseCases) {
      return this.resetTabToDefaultUrlUseCases;
    }

    this.resetTabToDefaultUrlUseCases = new ResetTabToDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getBrowserTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.resetTabToDefaultUrlUseCases;
  }

  private static getDefaultUrlUseCases: GetDefaultUrlUseCases;
  static getGetDefaultUrlUseCases(): GetDefaultUrlUseCases {
    if(this.getDefaultUrlUseCases) {
      return this.getDefaultUrlUseCases;
    }

    this.getDefaultUrlUseCases = new GetDefaultUrlUseCases(
      DefaultUrlDependencyProvider.getBrowserTabsService(),
      DefaultUrlDependencyProvider.getDefaultUrlRepository(),
    );

    return this.getDefaultUrlUseCases;
  }

  private static clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  static getClearDefaultUrlUseCases(): ClearDefaultUrlUseCases {
    if(this.clearDefaultUrlUseCases) {
      return this.clearDefaultUrlUseCases;
    }

    this.clearDefaultUrlUseCases = new ClearDefaultUrlUseCases(DefaultUrlDependencyProvider.getBrowserTabsService(), DefaultUrlDependencyProvider.getDefaultUrlRepository());
    return this.clearDefaultUrlUseCases;
  }

  private static settingsUseCases: SettingsUseCases;
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

  //Presentation - Context menu listeners
  private static contextMenuListeners: ContextMenuListener[];
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

  //Presentation - Extension event listeners
  private static onExtensionInstalledListeners: ExtensionListener[];
  static getOnExtensionInstalledListeners(): ExtensionListener[] {
    if(this.onExtensionInstalledListeners) {
      return this.onExtensionInstalledListeners;
    }

    this.onExtensionInstalledListeners = [
      new OnExtensionInstalledLoadDefaultSettings(DefaultUrlDependencyProvider.getSettingsUseCases()),
    ];

    return this.onExtensionInstalledListeners;
  }

  //Presentation - Shortcut listeners
  private static shortcutListeners: ShortcutListener[];
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

  //Presentation - Tab event listeners
  private static onCloseTabEventListeners: TabEventListener[];
  static getOnCloseTabEventListeners(): TabEventListener[] {
    if(this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
      new OnTabCloseRemoveDefaultUrl(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
    ];

    return this.onCloseTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if(this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetDefaultUrl(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
    ];

    return this.onCreateTabEventListeners;
  }

  private static onUpdateTabEventListeners: TabEventListener[];
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

  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if(this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      ...DefaultUrlDependencyProvider.getClearDefaultUrlUseCaseMessageEventListeners(),
      ...DefaultUrlDependencyProvider.getSetDefaultUrlUseCaseMessageEventListeners(),
      ...DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCaseMessageEventListeners(),
      ...DefaultUrlDependencyProvider.getGetDefaultUrlUseCaseMessageEventListeners(),
    ];

    return this.messageEventListeners;
  }

  private static clearDefaultUrlUseCaseListeners: [ClearCurrentTabDefaultUrlMessageEventListener, ClearTabDefaultUrlMessageEventListener];
  static getClearDefaultUrlUseCaseMessageEventListeners(): [ClearCurrentTabDefaultUrlMessageEventListener, ClearTabDefaultUrlMessageEventListener] {
    if(this.clearDefaultUrlUseCaseListeners) {
      return this.clearDefaultUrlUseCaseListeners;
    }

    this.clearDefaultUrlUseCaseListeners = [
      new ClearCurrentTabDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
      new ClearTabDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getClearDefaultUrlUseCases()),
    ];

    return this.clearDefaultUrlUseCaseListeners;
  }

  private static getDefaultUrlUseCaseListeners: [GetCurrentTabDefaultUrlMessageEventListener];
  static getGetDefaultUrlUseCaseMessageEventListeners(): [GetCurrentTabDefaultUrlMessageEventListener] {
    if(this.getDefaultUrlUseCaseListeners) {
      return this.getDefaultUrlUseCaseListeners;
    }

    this.getDefaultUrlUseCaseListeners = [
      new GetCurrentTabDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getGetDefaultUrlUseCases()),
    ];

    return this.getDefaultUrlUseCaseListeners;
  }

  private static resetTabToDefaultUrlUseCaseListeners: [ResetCurrentTabToDefaultUrlMessageEventListener, ResetOrCloseCurrentTabToDefaultUrlMessageEventListener];
  static getResetTabToDefaultUrlUseCaseMessageEventListeners(): [ResetCurrentTabToDefaultUrlMessageEventListener, ResetOrCloseCurrentTabToDefaultUrlMessageEventListener] {
    if(this.resetTabToDefaultUrlUseCaseListeners) {
      return this.resetTabToDefaultUrlUseCaseListeners;
    }

    this.resetTabToDefaultUrlUseCaseListeners = [
      new ResetCurrentTabToDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases()),
      new ResetOrCloseCurrentTabToDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases()),
    ];

    return this.resetTabToDefaultUrlUseCaseListeners;
  }

  private static setDefaultUrlUseCaseListeners: [SetCurrentTabDefaultUrlMessageEventListener, SetTabDefaultUrlIfUnsetMessageEventListener];
  static getSetDefaultUrlUseCaseMessageEventListeners(): [SetCurrentTabDefaultUrlMessageEventListener, SetTabDefaultUrlIfUnsetMessageEventListener] {
    if(this.setDefaultUrlUseCaseListeners) {
      return this.setDefaultUrlUseCaseListeners;
    }

    this.setDefaultUrlUseCaseListeners = [
      new SetCurrentTabDefaultUrlMessageEventListener(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
      new SetTabDefaultUrlIfUnsetMessageEventListener(DefaultUrlDependencyProvider.getSetDefaultUrlUseCases()),
    ];

    return this.setDefaultUrlUseCaseListeners;
  }

  //Presentation - Message events - Senders
  private static clearDefaultUrlMessageEventSender: ClearDefaultUrlMessageEventSender;
  static getClearDefaultUrlMessageEventSender(): ClearDefaultUrlMessageEventSender {
    if(this.clearDefaultUrlMessageEventSender) {
      return this.clearDefaultUrlMessageEventSender;
    }

    this.clearDefaultUrlMessageEventSender = new ClearDefaultUrlMessageEventSender(
      DefaultUrlDependencyProvider.getBrowserMessageService(),
      DefaultUrlDependencyProvider.getClearDefaultUrlUseCaseMessageEventListeners(),
    );

    return this.clearDefaultUrlMessageEventSender;
  }

  private static getDefaultUrlMessageEventSender: GetDefaultUrlMessageEventSender;
  static getGetDefaultUrlMessageEventSender(): GetDefaultUrlMessageEventSender {
    if(this.getDefaultUrlMessageEventSender) {
      return this.getDefaultUrlMessageEventSender;
    }

    this.getDefaultUrlMessageEventSender = new GetDefaultUrlMessageEventSender(
      DefaultUrlDependencyProvider.getBrowserMessageService(),
      DefaultUrlDependencyProvider.getGetDefaultUrlUseCaseMessageEventListeners(),
    );

    return this.getDefaultUrlMessageEventSender;
  }

  private static resetTabToDefaultUrlMessageEventSender: ResetTabToDefaultUrlMessageEventSender;
  static getResetTabToDefaultUrlMessageEventSender(): ResetTabToDefaultUrlMessageEventSender {
    if(this.resetTabToDefaultUrlMessageEventSender) {
      return this.resetTabToDefaultUrlMessageEventSender;
    }

    this.resetTabToDefaultUrlMessageEventSender = new ResetTabToDefaultUrlMessageEventSender(
      DefaultUrlDependencyProvider.getBrowserMessageService(),
      DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCaseMessageEventListeners(),
    );

    return this.resetTabToDefaultUrlMessageEventSender;
  }

  private static setDefaultUrlMessageEventSender: SetDefaultUrlMessageEventSender;
  static getSetDefaultUrlMessageEventSender(): SetDefaultUrlMessageEventSender {
    if(this.setDefaultUrlMessageEventSender) {
      return this.setDefaultUrlMessageEventSender;
    }

    this.setDefaultUrlMessageEventSender = new SetDefaultUrlMessageEventSender(
      DefaultUrlDependencyProvider.getBrowserMessageService(),
      DefaultUrlDependencyProvider.getSetDefaultUrlUseCaseMessageEventListeners(),
    );

    return this.setDefaultUrlMessageEventSender;
  }

}
