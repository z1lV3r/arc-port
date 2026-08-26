import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { BrowserShortcutSettingsService } from "@repo/shared/domain/interfaces/browser-shortcut-settings-service";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ActionListener } from "@repo/shared/domain/models/action-listener";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";
import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";
import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";
import { StorageListener } from "@repo/shared/domain/models/storage-listener";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import { ChromeBrowserExtensionActionService } from "@repo/shared/infrastructure/chrome-browser-extension-action-service";
import { ChromeContextMenuService } from "@repo/shared/infrastructure/chrome-context-menu-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { ChromeShortcutSettingsService } from "@repo/shared/infrastructure/chrome-shortcut-settings-service";
import { ChromeStorageSettingsRepository } from "@repo/shared/infrastructure/chrome-storage-settings-repository";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";
import { OnClickShowPopUp } from "./presentation/browser-events/action-event-listeners/on-click-show-pop-up.ts";
import { OnExtensionInstalledLoadDefaultSettings } from "./presentation/browser-events/extension-event-listeners/on-extension-installed-load-default-settings.ts";
import { ExtensionActionSetting } from "./presentation/browser-events/settings-event-listeners/extension-action-setting.ts";
import { ShowContextMenuSetting } from "./presentation/browser-events/settings-event-listeners/show-context-menu-setting.ts";
import { ExtensionActionSettingUseCases } from "./use-cases/extension-action-setting-use-cases.ts";
import { ShowContextMenuSettingUseCases } from "./use-cases/show-context-menu-setting-use-cases.ts";
import { CreateWorkspaceUseCases } from "./use-cases/create-workspace-use-cases.ts";
import { WorkspaceRepository } from "./domain/interfaces/workspace-repository.ts";
import { ChromeStorageWorkspaceRepository } from "./infrastructure/chrome-storage-workspace-repository.ts";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import { ChromeWindowService } from "@repo/shared/infrastructure/chrome-window-service";
import { ChromeWorkspaceService } from "./infrastructure/chrome-workspace-service.ts";
import { BrowserWorkspaceService } from "./domain/interfaces/browser-workspace-service.ts";
import { ChromeTabGroupService } from "@repo/shared/infrastructure/chrome-tab-group-service";
import { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { GetWorkspaceUseCases } from "./use-cases/get-workspace-use-cases.ts";
import { WorkspaceOrderRepository } from "./domain/interfaces/workspace-order-repository.ts";
import { ChromeStorageWorkspaceOrderRepository } from "./infrastructure/chrome-storage-workspace-order-repository.ts";
import { OrderWorkspaceUseCases } from "./use-cases/order-workspace-use-cases.ts";

export class DependencyProvider {
  //Infrastructure - Data
  private static workspaceRepository: WorkspaceRepository;
  static getWorkspaceRepository(): WorkspaceRepository {
    if (this.workspaceRepository) {
      return this.workspaceRepository;
    }

    this.workspaceRepository = new ChromeStorageWorkspaceRepository();
    return this.workspaceRepository;
  }

  private static workspaceOrderRepository: WorkspaceOrderRepository;
  static getWorkspaceOrderRepository(): WorkspaceOrderRepository {
    if (this.workspaceOrderRepository) {
      return this.workspaceOrderRepository;
    }

    this.workspaceOrderRepository = new ChromeStorageWorkspaceOrderRepository();
    return this.workspaceOrderRepository;
  }

  //Infrastructure - Browser
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
  static getBrowserWindowsService(): BrowserWindowService {
    if (this.browserWindowsService) {
      return this.browserWindowsService;
    }

    this.browserWindowsService = new ChromeWindowService();
    return this.browserWindowsService;
  }

  private static browserWorkspaceService: BrowserWorkspaceService;
  static getBrowserWorkspaceService(): BrowserWorkspaceService {
    if (this.browserWorkspaceService) {
      return this.browserWorkspaceService;
    }

    this.browserWorkspaceService = new ChromeWorkspaceService(
      DependencyProvider.getBrowserWindowsService(),
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getBrowserTabGroupsService()
    );
    return this.browserWorkspaceService;
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
  //Use cases
  private static showContextMenuSettingUseCases: ShowContextMenuSettingUseCases;
  static getShowContextMenuSettingUseCases(): ShowContextMenuSettingUseCases {
    if (this.showContextMenuSettingUseCases) {
      return this.showContextMenuSettingUseCases;
    }

    this.showContextMenuSettingUseCases = new ShowContextMenuSettingUseCases(
      DependencyProvider.getSettingsRepository(),
    );

    return this.showContextMenuSettingUseCases;
  }

  private static extensionActionSettingUseCases: ExtensionActionSettingUseCases;
  static getExtensionActionSettingUseCases(): ExtensionActionSettingUseCases {
    if (this.extensionActionSettingUseCases) {
      return this.extensionActionSettingUseCases;
    }

    this.extensionActionSettingUseCases = new ExtensionActionSettingUseCases(
      DependencyProvider.getSettingsRepository(),
    );

    return this.extensionActionSettingUseCases;
  }

  private static createWorkspaceUseCases: CreateWorkspaceUseCases;
  static getCreateWorkspaceUseCases(): CreateWorkspaceUseCases {
    if (this.createWorkspaceUseCases) {
      return this.createWorkspaceUseCases;
    }

    this.createWorkspaceUseCases = new CreateWorkspaceUseCases(
      DependencyProvider.getWorkspaceRepository(),
      DependencyProvider.getBrowserWorkspaceService(),
      DependencyProvider.getOrderWorkspaceUseCases()
    );

    return this.createWorkspaceUseCases;
  }

  private static getWorkspaceUseCases: GetWorkspaceUseCases;
  static getGetWorkspaceUseCases(): GetWorkspaceUseCases {
    if (this.getWorkspaceUseCases) {
      return this.getWorkspaceUseCases;
    }

    this.getWorkspaceUseCases = new GetWorkspaceUseCases(
      DependencyProvider.getWorkspaceRepository(),
      DependencyProvider.getBrowserWorkspaceService(),
    );

    return this.getWorkspaceUseCases;
  }

  private static orderWorkspaceUseCases: OrderWorkspaceUseCases;
  static getOrderWorkspaceUseCases(): OrderWorkspaceUseCases {
    if (this.orderWorkspaceUseCases) {
      return this.orderWorkspaceUseCases;
    }

    this.orderWorkspaceUseCases = new OrderWorkspaceUseCases(
      DependencyProvider.getWorkspaceOrderRepository()
    );

    return this.orderWorkspaceUseCases;
  }

  //Presentation - Settings event listeners
  private static settingChangeEventListeners: [
    ShowContextMenuSetting,
    ExtensionActionSetting,
  ];
  static getSettingChangeEventListeners(): [
    ShowContextMenuSetting,
    ExtensionActionSetting,
  ] {
    if (this.settingChangeEventListeners) {
      return this.settingChangeEventListeners;
    }

    this.settingChangeEventListeners = [
      new ShowContextMenuSetting(
        DependencyProvider.getBrowserContextMenuService(),
        DependencyProvider.getContextMenuListeners(),
      ),
      new ExtensionActionSetting(
        DependencyProvider.getBrowserExtensionActionService(),
        DependencyProvider.getActionListeners(),
      ),
    ];

    return this.settingChangeEventListeners;
  }

  //Presentation - storage listeners
  private static storageListeners: StorageListener[];
  static getStorageListeners(): StorageListener[] {
    if (this.storageListeners) {
      return this.storageListeners;
    }

    this.storageListeners = [
    ];

    return this.storageListeners;
  }

  //Presentation - Context menu listeners
  private static contextMenuListeners: ContextMenuListener[];
  static getContextMenuListeners(): ContextMenuListener[] {
    if (this.contextMenuListeners) {
      return this.contextMenuListeners;
    }

    this.contextMenuListeners = [
    ];

    return this.contextMenuListeners;
  }

  //Presentation - Extension event listeners
  private static onExtensionInstalledListeners: ExtensionListener[];
  static getOnExtensionInstalledListeners(): ExtensionListener[] {
    if (this.onExtensionInstalledListeners) {
      return this.onExtensionInstalledListeners;
    }

    this.onExtensionInstalledListeners = [
      new OnExtensionInstalledLoadDefaultSettings(
        DependencyProvider.getShowContextMenuSettingUseCases(),
        DependencyProvider.getExtensionActionSettingUseCases(),
      ),
    ];

    return this.onExtensionInstalledListeners;
  }

  //Presentation - Action listeners
  private static actionListeners: ActionListener[];
  static getActionListeners(): ActionListener[] {
    if (this.actionListeners) {
      return this.actionListeners;
    }

    this.actionListeners = [
      new OnClickShowPopUp(),
    ];

    return this.actionListeners;
  }

  //Presentation - Shortcut listeners
  private static shortcutListeners: ShortcutListener[];
  static getShortcutListeners(): ShortcutListener[] {
    if (this.shortcutListeners) {
      return this.shortcutListeners;
    }

    this.shortcutListeners = [
    ];

    return this.shortcutListeners;
  }

  //Presentation - Tab event listeners
  private static onTabActivatedEventListeners: TabEventListener[];
  static getOnTabActivatedEventListeners(): TabEventListener[] {
    if (this.onTabActivatedEventListeners) {
      return this.onTabActivatedEventListeners;
    }

    this.onTabActivatedEventListeners = [
    ];

    return this.onTabActivatedEventListeners;
  }

  private static onCloseTabEventListeners: TabEventListener[];
  static getOnCloseTabEventListeners(): TabEventListener[] {
    if (this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
    ];

    return this.onCloseTabEventListeners;
  }

  private static onUpdateTabEventListeners: TabEventListener[];
  static getOnUpdateTabEventListeners(): TabEventListener[] {
    if (this.onUpdateTabEventListeners) {
      return this.onUpdateTabEventListeners;
    }

    this.onUpdateTabEventListeners = [
    ];

    return this.onUpdateTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if (this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
    ];

    return this.onCreateTabEventListeners;
  }
  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if (this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
    ];

    return this.messageEventListeners;
  }

  //Presentation - Message events - Senders
}
