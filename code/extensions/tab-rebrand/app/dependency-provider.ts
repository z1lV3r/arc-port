import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { BrowserService } from "@repo/shared/domain/interfaces/browser-service";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { BrowserShortcutSettingsService } from "@repo/shared/domain/interfaces/browser-shortcut-settings-service";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ActionListener } from "@repo/shared/domain/models/action-listener";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";
import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";
import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import { SettingChangeListener } from "@repo/shared/domain/models/setting-listener";
import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";
import { StorageListener } from "@repo/shared/domain/models/storage-listener";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import { ChromeBrowserExtensionActionService } from "@repo/shared/infrastructure/chrome-browser-extension-action-service";
import { ChromeBrowserService } from "@repo/shared/infrastructure/chrome-browser-service";
import { ChromeContextMenuService } from "@repo/shared/infrastructure/chrome-context-menu-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { ChromeShortcutSettingsService } from "@repo/shared/infrastructure/chrome-shortcut-settings-service";
import { ChromeStorageSettingsRepository } from "@repo/shared/infrastructure/chrome-storage-settings-repository";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";

// Tab-Rebrand specific imports
import { ChromeOriginalTabInformationService } from "./infrastructure/chrome-original-tab-information-service.ts";
import { ChromeStorageCustomIconRepository } from "./infrastructure/chrome-storage-custom-icon-repository.ts";
import { ChromeStorageCustomNameRepository } from "./infrastructure/chrome-storage-custom-name-repository.ts";
import { ChromeStorageOriginalIconRepository } from "./infrastructure/chrome-storage-original-icon-repository.ts";
import { ChromeStorageOriginalNameRepository } from "./infrastructure/chrome-storage-original-name-repository.ts";
import type { CustomIconRepository } from "./domain/interfaces/custom-icon-repository.ts";
import type { CustomNameRepository } from "./domain/interfaces/custom-name-repository.ts";
import type { OriginalIconRepository } from "./domain/interfaces/original-icon-repository.ts";
import type { OriginalNameRepository } from "./domain/interfaces/original-name-repository.ts";
import type { OriginalTabInformationService } from "./domain/interfaces/original-tab-information-service.ts";
import { ClearTabCustomIconUseCases } from "./use-cases/clear-tab-custom-icon-use-cases.ts";
import { ClearTabCustomNameUseCases } from "./use-cases/clear-tab-custom-name-use-cases.ts";
import { GetTabCustomIconUseCases } from "./use-cases/get-tab-custom-icon-use-cases.ts";
import { OpenPopUpUseCases } from "./use-cases/open-pop-up-use-cases.ts";
import { GetTabCustomNameUseCases } from "./use-cases/get-tab-custom-name-use-cases.ts";
import { SetTabCustomIconUseCases } from "./use-cases/set-tab-custom-icon-use-cases.ts";
import { SetTabCustomNameUseCases } from "./use-cases/set-tab-custom-name-use-cases.ts";
import { TabRebrandSettingsUseCases } from "./use-cases/tab-rebrand-settings-use-cases.ts";
import { ClearCurrentTabCustomIconMessageEventListener } from "./presentation/messages/custom-icon/clear-current-tab-custom-icon-message-event-listener.ts";
import { ClearCurrentTabCustomNameMessageEventListener } from "./presentation/messages/custom-name/clear-current-tab-custom-name-message-event-listener.ts";
import { ClearTabCustomIconMessageEventSender } from "./presentation/messages/custom-icon/clear-tab-custom-icon-message-event-sender.ts";
import { ClearTabCustomNameMessageEventSender } from "./presentation/messages/custom-name/clear-tab-custom-name-message-event-sender.ts";
import { GetCurrentTabCustomIconMessageEventListener } from "./presentation/messages/custom-icon/get-current-tab-custom-icon-message-event-listener.ts";
import { GetCurrentTabCustomNameMessageEventListener } from "./presentation/messages/custom-name/get-current-tab-custom-name-message-event-listener.ts";
import { GetTabCustomIconMessageEventSender } from "./presentation/messages/custom-icon/get-tab-custom-icon-message-event-sender.ts";
import { GetTabCustomNameMessageEventSender } from "./presentation/messages/custom-name/get-tab-custom-name-message-event-sender.ts";
import { SetCurrentTabCustomIconMessageEventListener } from "./presentation/messages/custom-icon/set-current-tab-custom-icon-message-event-listener.ts";
import { SetCurrentTabCustomNameMessageEventListener } from "./presentation/messages/custom-name/set-current-tab-custom-name-message-event-listener.ts";
import { SetTabCustomIconMessageEventSender } from "./presentation/messages/custom-icon/set-tab-custom-icon-message-event-sender.ts";
import { SetTabCustomNameMessageEventSender } from "./presentation/messages/custom-name/set-tab-custom-name-message-event-sender.ts";

import { CheckpointRepository } from "./domain/interfaces/checkpoint-repository.ts";
import { ChromeStorageCheckpointRepository } from "./infrastructure/chrome-storage-checkpoint-repository.ts";
import { OnClickResetCurrentTabToCheckpoint } from "./presentation/browser-events/action-event-listeners/on-click-reset-current-tab-to-checkpoint.ts";
import { OnClickShowPopUp } from "./presentation/browser-events/action-event-listeners/on-click-show-pop-up.ts";
import { OnExtensionInstalledLoadDefaultSettings } from "./presentation/browser-events/extension-event-listeners/on-extension-installed-load-default-settings.ts";
import { ExtensionActionSetting } from "./presentation/browser-events/settings-event-listeners/extension-action-setting.ts";
import { ShowContextMenuSetting } from "./presentation/browser-events/settings-event-listeners/show-context-menu-setting.ts";
import { OnCheckpointChanged } from "./presentation/browser-events/storage-event-listeners/on-checkpoint-changed.ts";
import { OnTabActivatedSetIcon } from "./presentation/browser-events/tab-event-listeners/on-tab-activated-set-icon.ts";
import { OnTabCloseRemoveCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-close-delete-checkpoint.ts";
import { OnTabCreatePinnedSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-create-pinned-checkpoint.ts";
import { OnTabPinSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-pin-set-checkpoint.ts";
import { OnTabSetToGroupSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-set-to-group-set-checkpoint.ts";
import { ClearCurrentTabCheckpointContextMenuListener } from "./presentation/context-menu/clear-current-tab-checkpoint-context-menu-listener.ts";
import { OpenTabRebrandUiFocusCustomIconContextMenuListener } from "./presentation/context-menu/open-tab-rebrand-ui-focus-custom-icon-context-menu-listener.ts";
import { OpenTabRebrandUiFocusCustomNameContextMenuListener } from "./presentation/context-menu/open-tab-rebrand-ui-focus-custom-name-context-menu-listener.ts";
import { ResetCurrentTabToCheckpointContextMenuListener } from "./presentation/context-menu/reset-current-tab-to-checkpoint-context-menu-listener.ts";
import { SetCurrentTabCheckpointContextMenuListener } from "./presentation/context-menu/set-current-tab-checkpoint-context-menu-listener.ts";
import { ShowCurrentTabCheckpointContextMenuListener } from "./presentation/context-menu/show-current-tab-checkpoint-context-menu-listener.ts";
import { ClearCheckpointMessageEventSender } from "./presentation/messages/clear-checkpoint/_clear-checkpoint-message-event-sender.ts";
import { ClearCurrentTabCheckpointMessageEventListener } from "./presentation/messages/clear-checkpoint/clear-current-tab-checkpoint-message-event-listener.ts";
import { ClearTabCheckpointMessageEventListener } from "./presentation/messages/clear-checkpoint/clear-tab-checkpoint-message-event-listener.ts";
import { GetCheckpointMessageEventSender } from "./presentation/messages/get-checkpoint/_get-checkpoint-message-event-sender.ts";
import { GetCurrentTabCheckpointMessageEventListener } from "./presentation/messages/get-checkpoint/get-current-tab-checkpoint-message-event-listener.ts";
import { ResetTabToCheckpointMessageEventSender } from "./presentation/messages/reset-tab-to-checkpoint/_reset-tab-to-checkpoint-message-event-sender.ts";
import { ResetCurrentTabToCheckpointMessageEventListener } from "./presentation/messages/reset-tab-to-checkpoint/reset-current-tab-to-checkpoint-message-event-listener.ts";
import { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./presentation/messages/reset-tab-to-checkpoint/reset-or-close-current-tab-to-checkpoint-message-event-listener.ts";
import { SetCheckpointMessageEventSender } from "./presentation/messages/set-checkpoint/_set-checkpoint-message-event-sender.ts";
import { SetCurrentTabCheckpointMessageEventListener } from "./presentation/messages/set-checkpoint/set-current-tab-checkpoint-message-event-listener.ts";
import { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/messages/set-checkpoint/set-tab-checkpoint-if-unset-message-event-listener.ts";
import { ClearCurrentTabCheckpointShortcutListener } from "./presentation/shortcuts/clear-current-tab-checkpoint-shortcut-listener.ts";
import { OpenTabRebrandUiFocusCustomIconShortcutListener } from "./presentation/shortcuts/open-tab-rebrand-ui-focus-custom-icon-shortcut-listener.ts";
import { OpenTabRebrandUiFocusCustomNameShortcutListener } from "./presentation/shortcuts/open-tab-rebrand-ui-focus-custom-name-shortcut-listener.ts";
import { ResetCurrentTabToCheckpointShortcutListener } from "./presentation/shortcuts/reset-current-tab-to-checkpoint-shortcut-listener.ts";
import { ResetOrCloseCurrentTabToCheckpointShortcutListener } from "./presentation/shortcuts/reset-or-close-current-tab-to-checkpoint-shortcut-listener.ts";
import { SetCurrentTabCheckpointShortcutListener } from "./presentation/shortcuts/set-current-tab-checkpoint-shortcut-listener.ts";
import { ClearCheckpointUseCases } from "./use-cases/clear-checkpoint-use-cases.ts";
import { ExtensionActionSettingUseCases } from "./use-cases/extension-action-setting-use-cases.ts";
import { GetCheckpointUseCases } from "./use-cases/get-checkpoint-use-cases.ts";
import { ResetTabToCheckpointUseCases } from "./use-cases/reset-tab-to-checkpoint-use-cases.ts";
import { SetCheckpointUseCases } from "./use-cases/set-checkpoint-use-cases.ts";
import { ShowCheckpointUseCases } from "./use-cases/show-checkpoint-use-cases.ts";
import { ShowContextMenuSettingUseCases } from "./use-cases/show-context-menu-setting-use-cases.ts";

export class DependencyProvider {
  //Infrastructure - Data
  private static checkpointRepository: CheckpointRepository;
  static getCheckpointRepository(): CheckpointRepository {
    if (this.checkpointRepository) {
      return this.checkpointRepository;
    }

    this.checkpointRepository = new ChromeStorageCheckpointRepository();
    return this.checkpointRepository;
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

  private static browserService: BrowserService;
  static getBrowserService(): BrowserService {
    if (this.browserService) {
      return this.browserService;
    }

    this.browserService = new ChromeBrowserService();
    return this.browserService;
  }

  //Use cases
  private static setCheckpointUseCases: SetCheckpointUseCases;
  static getSetCheckpointUseCases(): SetCheckpointUseCases {
    if (this.setCheckpointUseCases) {
      return this.setCheckpointUseCases;
    }

    this.setCheckpointUseCases = new SetCheckpointUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getCheckpointRepository(),
    );

    return this.setCheckpointUseCases;
  }

  private static getCheckpointUseCases: GetCheckpointUseCases;
  static getGetCheckpointUseCases(): GetCheckpointUseCases {
    if (this.getCheckpointUseCases) {
      return this.getCheckpointUseCases;
    }

    this.getCheckpointUseCases = new GetCheckpointUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getCheckpointRepository(),
    );

    return this.getCheckpointUseCases;
  }

  private static clearCheckpointUseCases: ClearCheckpointUseCases;
  static getClearCheckpointUseCases(): ClearCheckpointUseCases {
    if (this.clearCheckpointUseCases) {
      return this.clearCheckpointUseCases;
    }

    this.clearCheckpointUseCases = new ClearCheckpointUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getCheckpointRepository(),
    );

    return this.clearCheckpointUseCases;
  }

  private static resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;
  static getResetTabToCheckpointUseCases(): ResetTabToCheckpointUseCases {
    if (this.resetTabToCheckpointUseCases) {
      return this.resetTabToCheckpointUseCases;
    }

    this.resetTabToCheckpointUseCases = new ResetTabToCheckpointUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getCheckpointRepository(),
    );

    return this.resetTabToCheckpointUseCases;
  }
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

  private static showCheckpointUseCases: ShowCheckpointUseCases;
  static getShowCheckpointUseCases(): ShowCheckpointUseCases {
    if (this.showCheckpointUseCases) {
      return this.showCheckpointUseCases;
    }

    this.showCheckpointUseCases = new ShowCheckpointUseCases(
      DependencyProvider.getBrowserExtensionActionService(),
      DependencyProvider.getActionListeners(),
      DependencyProvider.getExtensionActionSettingUseCases(),
    );

    return this.showCheckpointUseCases;
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
      new OnCheckpointChanged(
        DependencyProvider.getBrowserExtensionActionService(),
        DependencyProvider.getBrowserTabsService(),
      ),
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
      new SetCurrentTabCheckpointContextMenuListener(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
      new ResetCurrentTabToCheckpointContextMenuListener(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
      new ClearCurrentTabCheckpointContextMenuListener(
        DependencyProvider.getClearCheckpointUseCases(),
      ),
      new ShowCurrentTabCheckpointContextMenuListener(
        DependencyProvider.getShowCheckpointUseCases(),
      ),
      new OpenTabRebrandUiFocusCustomIconContextMenuListener(
        DependencyProvider.getOpenPopUpUseCases(),
      ),
      new OpenTabRebrandUiFocusCustomNameContextMenuListener(
        DependencyProvider.getOpenPopUpUseCases(),
      ),
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
      new OnClickResetCurrentTabToCheckpoint(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
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
      new SetCurrentTabCheckpointShortcutListener(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
      new ClearCurrentTabCheckpointShortcutListener(
        DependencyProvider.getClearCheckpointUseCases(),
      ),
      new ResetCurrentTabToCheckpointShortcutListener(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
      new ResetOrCloseCurrentTabToCheckpointShortcutListener(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
      new OpenTabRebrandUiFocusCustomIconShortcutListener(
        DependencyProvider.getOpenPopUpUseCases(),
      ),
      new OpenTabRebrandUiFocusCustomNameShortcutListener(
        DependencyProvider.getOpenPopUpUseCases(),
      ),
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
      new OnTabActivatedSetIcon(
        DependencyProvider.getBrowserExtensionActionService(),
        DependencyProvider.getGetCheckpointUseCases(),
      ),
    ];

    return this.onTabActivatedEventListeners;
  }

  private static onCloseTabEventListeners: TabEventListener[];
  static getOnCloseTabEventListeners(): TabEventListener[] {
    if (this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
      new OnTabCloseRemoveCheckpoint(
        DependencyProvider.getClearCheckpointUseCases(),
      ),
    ];

    return this.onCloseTabEventListeners;
  }

  private static onUpdateTabEventListeners: TabEventListener[];
  static getOnUpdateTabEventListeners(): TabEventListener[] {
    if (this.onUpdateTabEventListeners) {
      return this.onUpdateTabEventListeners;
    }

    this.onUpdateTabEventListeners = [
      new OnTabPinSetCheckpoint(DependencyProvider.getSetCheckpointUseCases()),
      new OnTabSetToGroupSetCheckpoint(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
    ];

    return this.onUpdateTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if (this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetCheckpoint(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
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
      ...DependencyProvider.getClearCheckpointUseCaseMessageEventListeners(),
      ...DependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
      ...DependencyProvider.getResetTabToCheckpointUseCaseMessageEventListeners(),
      ...DependencyProvider.getGetCheckpointUseCaseMessageEventListeners(),
      ...DependencyProvider.getClearTabCustomNameUseCaseMessageEventListeners(),
      ...DependencyProvider.getGetTabCustomNameUseCaseMessageEventListeners(),
      ...DependencyProvider.getSetTabCustomNameUseCaseMessageEventListeners(),
      ...DependencyProvider.getGetTabCustomIconUseCaseMessageEventListeners(),
      ...DependencyProvider.getSetTabCustomIconUseCaseMessageEventListeners(),
      ...DependencyProvider.getClearTabCustomIconUseCaseMessageEventListeners(),
    ];

    return this.messageEventListeners;
  }

  private static clearTabCustomNameUseCaseListeners: [
    ClearCurrentTabCustomNameMessageEventListener,
  ];
  static getClearTabCustomNameUseCaseMessageEventListeners(): [
    ClearCurrentTabCustomNameMessageEventListener,
  ] {
    if (this.clearTabCustomNameUseCaseListeners) {
      return this.clearTabCustomNameUseCaseListeners;
    }

    this.clearTabCustomNameUseCaseListeners = [
      new ClearCurrentTabCustomNameMessageEventListener(
        DependencyProvider.getClearTabCustomNameUseCases(),
      ),
    ];

    return this.clearTabCustomNameUseCaseListeners;
  }

  private static getTabCustomNameUseCaseListeners: [
    GetCurrentTabCustomNameMessageEventListener,
  ];
  static getGetTabCustomNameUseCaseMessageEventListeners(): [
    GetCurrentTabCustomNameMessageEventListener,
  ] {
    if (this.getTabCustomNameUseCaseListeners) {
      return this.getTabCustomNameUseCaseListeners;
    }

    this.getTabCustomNameUseCaseListeners = [
      new GetCurrentTabCustomNameMessageEventListener(
        DependencyProvider.getGetTabCustomNameUseCases(),
      ),
    ];

    return this.getTabCustomNameUseCaseListeners;
  }

  private static setTabCustomNameUseCaseListeners: [
    SetCurrentTabCustomNameMessageEventListener,
  ];
  static getSetTabCustomNameUseCaseMessageEventListeners(): [
    SetCurrentTabCustomNameMessageEventListener,
  ] {
    if (this.setTabCustomNameUseCaseListeners) {
      return this.setTabCustomNameUseCaseListeners;
    }

    this.setTabCustomNameUseCaseListeners = [
      new SetCurrentTabCustomNameMessageEventListener(
        DependencyProvider.getSetTabCustomNameUseCases(),
      ),
    ];

    return this.setTabCustomNameUseCaseListeners;
  }

  private static setTabCustiomIconUseCaseListeners: [
    SetCurrentTabCustomIconMessageEventListener,
  ];
  static getSetTabCustomIconUseCaseMessageEventListeners(): [
    SetCurrentTabCustomIconMessageEventListener,
  ] {
    if (this.setTabCustiomIconUseCaseListeners) {
      return this.setTabCustiomIconUseCaseListeners;
    }

    this.setTabCustiomIconUseCaseListeners = [
      new SetCurrentTabCustomIconMessageEventListener(
        DependencyProvider.getSetTabCustomIconUseCases(),
      ),
    ];

    return this.setTabCustiomIconUseCaseListeners;
  }

  private static getTabCustiomIconUseCaseListeners: [
    GetCurrentTabCustomIconMessageEventListener,
  ];
  static getGetTabCustomIconUseCaseMessageEventListeners(): [
    GetCurrentTabCustomIconMessageEventListener,
  ] {
    if (this.getTabCustiomIconUseCaseListeners) {
      return this.getTabCustiomIconUseCaseListeners;
    }

    this.getTabCustiomIconUseCaseListeners = [
      new GetCurrentTabCustomIconMessageEventListener(
        DependencyProvider.getGetTabCustomIconUseCases(),
      ),
    ];

    return this.getTabCustiomIconUseCaseListeners;
  }

  private static clearTabCustiomIconUseCaseListeners: [
    ClearCurrentTabCustomIconMessageEventListener,
  ];
  static getClearTabCustomIconUseCaseMessageEventListeners(): [
    ClearCurrentTabCustomIconMessageEventListener,
  ] {
    if (this.clearTabCustiomIconUseCaseListeners) {
      return this.clearTabCustiomIconUseCaseListeners;
    }

    this.clearTabCustiomIconUseCaseListeners = [
      new ClearCurrentTabCustomIconMessageEventListener(
        DependencyProvider.getClearTabCustomIconUseCases(),
      ),
    ];

    return this.clearTabCustiomIconUseCaseListeners;
  }

  private static setCheckpointUseCaseListeners: [
    SetCurrentTabCheckpointMessageEventListener,
    SetTabCheckpointIfUnsetMessageEventListener,
  ];
  static getSetCheckpointUseCaseMessageEventListeners(): [
    SetCurrentTabCheckpointMessageEventListener,
    SetTabCheckpointIfUnsetMessageEventListener,
  ] {
    if (this.setCheckpointUseCaseListeners) {
      return this.setCheckpointUseCaseListeners;
    }

    this.setCheckpointUseCaseListeners = [
      new SetCurrentTabCheckpointMessageEventListener(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
      new SetTabCheckpointIfUnsetMessageEventListener(
        DependencyProvider.getSetCheckpointUseCases(),
      ),
    ];

    return this.setCheckpointUseCaseListeners;
  }

  private static getCheckpointUseCaseListeners: [
    GetCurrentTabCheckpointMessageEventListener,
  ];
  static getGetCheckpointUseCaseMessageEventListeners(): [
    GetCurrentTabCheckpointMessageEventListener,
  ] {
    if (this.getCheckpointUseCaseListeners) {
      return this.getCheckpointUseCaseListeners;
    }

    this.getCheckpointUseCaseListeners = [
      new GetCurrentTabCheckpointMessageEventListener(
        DependencyProvider.getGetCheckpointUseCases(),
      ),
    ];

    return this.getCheckpointUseCaseListeners;
  }

  private static clearCheckpointUseCaseListeners: [
    ClearCurrentTabCheckpointMessageEventListener,
    ClearTabCheckpointMessageEventListener,
  ];
  static getClearCheckpointUseCaseMessageEventListeners(): [
    ClearCurrentTabCheckpointMessageEventListener,
    ClearTabCheckpointMessageEventListener,
  ] {
    if (this.clearCheckpointUseCaseListeners) {
      return this.clearCheckpointUseCaseListeners;
    }

    this.clearCheckpointUseCaseListeners = [
      new ClearCurrentTabCheckpointMessageEventListener(
        DependencyProvider.getClearCheckpointUseCases(),
      ),
      new ClearTabCheckpointMessageEventListener(
        DependencyProvider.getClearCheckpointUseCases(),
      ),
    ];

    return this.clearCheckpointUseCaseListeners;
  }

  private static resetTabToCheckpointUseCaseListeners: [
    ResetCurrentTabToCheckpointMessageEventListener,
    ResetOrCloseCurrentTabToCheckpointMessageEventListener,
  ];
  static getResetTabToCheckpointUseCaseMessageEventListeners(): [
    ResetCurrentTabToCheckpointMessageEventListener,
    ResetOrCloseCurrentTabToCheckpointMessageEventListener,
  ] {
    if (this.resetTabToCheckpointUseCaseListeners) {
      return this.resetTabToCheckpointUseCaseListeners;
    }

    this.resetTabToCheckpointUseCaseListeners = [
      new ResetCurrentTabToCheckpointMessageEventListener(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
      new ResetOrCloseCurrentTabToCheckpointMessageEventListener(
        DependencyProvider.getResetTabToCheckpointUseCases(),
      ),
    ];

    return this.resetTabToCheckpointUseCaseListeners;
  }
  //Presentation - Message events - Senders
  private static resetTabToCheckpointMessageEventSender: ResetTabToCheckpointMessageEventSender;
  static getResetTabToCheckpointMessageEventSender(): ResetTabToCheckpointMessageEventSender {
    if (this.resetTabToCheckpointMessageEventSender) {
      return this.resetTabToCheckpointMessageEventSender;
    }

    this.resetTabToCheckpointMessageEventSender =
      new ResetTabToCheckpointMessageEventSender(
        DependencyProvider.getBrowserMessageService(),
        DependencyProvider.getResetTabToCheckpointUseCaseMessageEventListeners(),
      );

    return this.resetTabToCheckpointMessageEventSender;
  }

  private static clearCheckpointMessageEventSender: ClearCheckpointMessageEventSender;
  static getClearCheckpointMessageEventSender(): ClearCheckpointMessageEventSender {
    if (this.clearCheckpointMessageEventSender) {
      return this.clearCheckpointMessageEventSender;
    }

    this.clearCheckpointMessageEventSender =
      new ClearCheckpointMessageEventSender(
        DependencyProvider.getBrowserMessageService(),
        DependencyProvider.getClearCheckpointUseCaseMessageEventListeners(),
      );

    return this.clearCheckpointMessageEventSender;
  }

  private static getCheckpointMessageEventSender: GetCheckpointMessageEventSender;
  static getGetCheckpointMessageEventSender(): GetCheckpointMessageEventSender {
    if (this.getCheckpointMessageEventSender) {
      return this.getCheckpointMessageEventSender;
    }

    this.getCheckpointMessageEventSender = new GetCheckpointMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getGetCheckpointUseCaseMessageEventListeners(),
    );

    return this.getCheckpointMessageEventSender;
  }

  private static setCheckpointMessageEventSender: SetCheckpointMessageEventSender;
  static getSetCheckpointMessageEventSender(): SetCheckpointMessageEventSender {
    if (this.setCheckpointMessageEventSender) {
      return this.setCheckpointMessageEventSender;
    }

    this.setCheckpointMessageEventSender = new SetCheckpointMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
    );

    return this.setCheckpointMessageEventSender;
  }

  // ─── Tab-Rebrand: Infrastructure ────────────────────────────────────────────

  private static tabCustomNameRepository: CustomNameRepository;
  static getTabCustomNameRepository(): CustomNameRepository {
    if (this.tabCustomNameRepository) return this.tabCustomNameRepository;
    this.tabCustomNameRepository = new ChromeStorageCustomNameRepository();
    return this.tabCustomNameRepository;
  }

  private static tabCustomIconRepository: CustomIconRepository;
  static getTabCustomIconRepository(): CustomIconRepository {
    if (this.tabCustomIconRepository) return this.tabCustomIconRepository;
    this.tabCustomIconRepository = new ChromeStorageCustomIconRepository();
    return this.tabCustomIconRepository;
  }

  private static tabOriginalNameRepository: OriginalNameRepository;
  static getTabOriginalNameRepository(): OriginalNameRepository {
    if (this.tabOriginalNameRepository) return this.tabOriginalNameRepository;
    this.tabOriginalNameRepository = new ChromeStorageOriginalNameRepository();
    return this.tabOriginalNameRepository;
  }

  private static tabOriginalIconRepository: OriginalIconRepository;
  static getTabOriginalIconRepository(): OriginalIconRepository {
    if (this.tabOriginalIconRepository) return this.tabOriginalIconRepository;
    this.tabOriginalIconRepository = new ChromeStorageOriginalIconRepository();
    return this.tabOriginalIconRepository;
  }

  private static originalTabInformationService: OriginalTabInformationService;
  static getOriginalTabInformationService(): OriginalTabInformationService {
    if (this.originalTabInformationService) return this.originalTabInformationService;
    this.originalTabInformationService = new ChromeOriginalTabInformationService(
      DependencyProvider.getBrowserTabsService(),
    );
    return this.originalTabInformationService;
  }

  // ─── Tab-Rebrand: Use Cases ──────────────────────────────────────────────────

  private static setTabCustomNameUseCases: SetTabCustomNameUseCases;
  static getSetTabCustomNameUseCases(): SetTabCustomNameUseCases {
    if (this.setTabCustomNameUseCases) return this.setTabCustomNameUseCases;
    this.setTabCustomNameUseCases = new SetTabCustomNameUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getTabCustomNameRepository(),
      DependencyProvider.getTabOriginalNameRepository(),
    );
    return this.setTabCustomNameUseCases;
  }

  private static getTabCustomNameUseCases: GetTabCustomNameUseCases;
  static getGetTabCustomNameUseCases(): GetTabCustomNameUseCases {
    if (this.getTabCustomNameUseCases) return this.getTabCustomNameUseCases;
    this.getTabCustomNameUseCases = new GetTabCustomNameUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getTabCustomNameRepository(),
    );
    return this.getTabCustomNameUseCases;
  }

  private static clearTabCustomNameUseCases: ClearTabCustomNameUseCases;
  static getClearTabCustomNameUseCases(): ClearTabCustomNameUseCases {
    if (this.clearTabCustomNameUseCases) return this.clearTabCustomNameUseCases;
    this.clearTabCustomNameUseCases = new ClearTabCustomNameUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getOriginalTabInformationService(),
      DependencyProvider.getTabCustomNameRepository(),
      DependencyProvider.getTabOriginalNameRepository(),
    );
    return this.clearTabCustomNameUseCases;
  }

  private static setTabCustomIconUseCases: SetTabCustomIconUseCases;
  static getSetTabCustomIconUseCases(): SetTabCustomIconUseCases {
    if (this.setTabCustomIconUseCases) return this.setTabCustomIconUseCases;
    this.setTabCustomIconUseCases = new SetTabCustomIconUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getTabCustomIconRepository(),
      DependencyProvider.getTabOriginalIconRepository(),
    );
    return this.setTabCustomIconUseCases;
  }

  private static getTabCustomIconUseCases: GetTabCustomIconUseCases;
  static getGetTabCustomIconUseCases(): GetTabCustomIconUseCases {
    if (this.getTabCustomIconUseCases) return this.getTabCustomIconUseCases;
    this.getTabCustomIconUseCases = new GetTabCustomIconUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getTabCustomIconRepository(),
    );
    return this.getTabCustomIconUseCases;
  }

  private static clearTabCustomIconUseCases: ClearTabCustomIconUseCases;
  static getClearTabCustomIconUseCases(): ClearTabCustomIconUseCases {
    if (this.clearTabCustomIconUseCases) return this.clearTabCustomIconUseCases;
    this.clearTabCustomIconUseCases = new ClearTabCustomIconUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getTabCustomIconRepository(),
      DependencyProvider.getTabOriginalIconRepository(),
      DependencyProvider.getOriginalTabInformationService(),
    );
    return this.clearTabCustomIconUseCases;
  }

  private static tabRebrandSettingsUseCases: TabRebrandSettingsUseCases;
  static getTabRebrandSettingsUseCases(): TabRebrandSettingsUseCases {
    if (this.tabRebrandSettingsUseCases) return this.tabRebrandSettingsUseCases;
    this.tabRebrandSettingsUseCases = new TabRebrandSettingsUseCases(
      DependencyProvider.getSettingsRepository(),
      DependencyProvider.getBrowserContextMenuService(),
      DependencyProvider.getContextMenuListeners(),
    );
    return this.tabRebrandSettingsUseCases;
  }

  private static openPopUpUseCases: OpenPopUpUseCases;
  static getOpenPopUpUseCases(): OpenPopUpUseCases {
    if (this.openPopUpUseCases) return this.openPopUpUseCases;
    this.openPopUpUseCases = new OpenPopUpUseCases(
      DependencyProvider.getBrowserService(),
    );
    return this.openPopUpUseCases;
  }

  // ─── Tab-Rebrand: Message Event Listeners ───────────────────────────────────

  private static setCurrentTabCustomNameListener: [SetCurrentTabCustomNameMessageEventListener];
  static getSetCurrentTabCustomNameListener(): [SetCurrentTabCustomNameMessageEventListener] {
    if (this.setCurrentTabCustomNameListener) return this.setCurrentTabCustomNameListener;
    this.setCurrentTabCustomNameListener = [
      new SetCurrentTabCustomNameMessageEventListener(DependencyProvider.getSetTabCustomNameUseCases()),
    ];
    return this.setCurrentTabCustomNameListener;
  }

  private static getCurrentTabCustomNameListener: [GetCurrentTabCustomNameMessageEventListener];
  static getGetCurrentTabCustomNameListener(): [GetCurrentTabCustomNameMessageEventListener] {
    if (this.getCurrentTabCustomNameListener) return this.getCurrentTabCustomNameListener;
    this.getCurrentTabCustomNameListener = [
      new GetCurrentTabCustomNameMessageEventListener(DependencyProvider.getGetTabCustomNameUseCases()),
    ];
    return this.getCurrentTabCustomNameListener;
  }

  private static clearCurrentTabCustomNameListener: [ClearCurrentTabCustomNameMessageEventListener];
  static getClearCurrentTabCustomNameListener(): [ClearCurrentTabCustomNameMessageEventListener] {
    if (this.clearCurrentTabCustomNameListener) return this.clearCurrentTabCustomNameListener;
    this.clearCurrentTabCustomNameListener = [
      new ClearCurrentTabCustomNameMessageEventListener(DependencyProvider.getClearTabCustomNameUseCases()),
    ];
    return this.clearCurrentTabCustomNameListener;
  }

  private static setCurrentTabCustomIconListener: [SetCurrentTabCustomIconMessageEventListener];
  static getSetCurrentTabCustomIconListener(): [SetCurrentTabCustomIconMessageEventListener] {
    if (this.setCurrentTabCustomIconListener) return this.setCurrentTabCustomIconListener;
    this.setCurrentTabCustomIconListener = [
      new SetCurrentTabCustomIconMessageEventListener(DependencyProvider.getSetTabCustomIconUseCases()),
    ];
    return this.setCurrentTabCustomIconListener;
  }

  private static getCurrentTabCustomIconListener: [GetCurrentTabCustomIconMessageEventListener];
  static getGetCurrentTabCustomIconListener(): [GetCurrentTabCustomIconMessageEventListener] {
    if (this.getCurrentTabCustomIconListener) return this.getCurrentTabCustomIconListener;
    this.getCurrentTabCustomIconListener = [
      new GetCurrentTabCustomIconMessageEventListener(DependencyProvider.getGetTabCustomIconUseCases()),
    ];
    return this.getCurrentTabCustomIconListener;
  }

  private static clearCurrentTabCustomIconListener: [ClearCurrentTabCustomIconMessageEventListener];
  static getClearCurrentTabCustomIconListener(): [ClearCurrentTabCustomIconMessageEventListener] {
    if (this.clearCurrentTabCustomIconListener) return this.clearCurrentTabCustomIconListener;
    this.clearCurrentTabCustomIconListener = [
      new ClearCurrentTabCustomIconMessageEventListener(DependencyProvider.getClearTabCustomIconUseCases()),
    ];
    return this.clearCurrentTabCustomIconListener;
  }

  // ─── Tab-Rebrand: Message Event Senders ─────────────────────────────────────

  private static setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender;
  static getSetTabCustomNameMessageEventSender(): SetTabCustomNameMessageEventSender {
    if (this.setTabCustomNameMessageEventSender) return this.setTabCustomNameMessageEventSender;
    this.setTabCustomNameMessageEventSender = new SetTabCustomNameMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getSetCurrentTabCustomNameListener(),
    );
    return this.setTabCustomNameMessageEventSender;
  }

  private static getTabCustomNameMessageEventSender: GetTabCustomNameMessageEventSender;
  static getGetTabCustomNameMessageEventSender(): GetTabCustomNameMessageEventSender {
    if (this.getTabCustomNameMessageEventSender) return this.getTabCustomNameMessageEventSender;
    this.getTabCustomNameMessageEventSender = new GetTabCustomNameMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getGetCurrentTabCustomNameListener(),
    );
    return this.getTabCustomNameMessageEventSender;
  }

  private static clearTabCustomNameMessageEventSender: ClearTabCustomNameMessageEventSender;
  static getClearTabCustomNameMessageEventSender(): ClearTabCustomNameMessageEventSender {
    if (this.clearTabCustomNameMessageEventSender) return this.clearTabCustomNameMessageEventSender;
    this.clearTabCustomNameMessageEventSender = new ClearTabCustomNameMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getClearCurrentTabCustomNameListener(),
    );
    return this.clearTabCustomNameMessageEventSender;
  }

  private static setTabCustomIconMessageEventSender: SetTabCustomIconMessageEventSender;
  static getSetTabCustomIconMessageEventSender(): SetTabCustomIconMessageEventSender {
    if (this.setTabCustomIconMessageEventSender) return this.setTabCustomIconMessageEventSender;
    this.setTabCustomIconMessageEventSender = new SetTabCustomIconMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getSetCurrentTabCustomIconListener(),
    );
    return this.setTabCustomIconMessageEventSender;
  }

  private static getTabCustomIconMessageEventSender: GetTabCustomIconMessageEventSender;
  static getGetTabCustomIconMessageEventSender(): GetTabCustomIconMessageEventSender {
    if (this.getTabCustomIconMessageEventSender) return this.getTabCustomIconMessageEventSender;
    this.getTabCustomIconMessageEventSender = new GetTabCustomIconMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getGetCurrentTabCustomIconListener(),
    );
    return this.getTabCustomIconMessageEventSender;
  }

  private static clearTabCustomIconMessageEventSender: ClearTabCustomIconMessageEventSender;
  static getClearTabCustomIconMessageEventSender(): ClearTabCustomIconMessageEventSender {
    if (this.clearTabCustomIconMessageEventSender) return this.clearTabCustomIconMessageEventSender;
    this.clearTabCustomIconMessageEventSender = new ClearTabCustomIconMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getClearCurrentTabCustomIconListener(),
    );
    return this.clearTabCustomIconMessageEventSender;
  }
}
