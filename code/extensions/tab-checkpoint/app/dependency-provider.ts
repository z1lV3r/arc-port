import { SetCheckpointMessageEventSender } from "./presentation/messages/set-checkpoint/_set-checkpoint-message-event-sender.ts";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { SetCurrentTabCheckpointMessageEventListener } from "./presentation/messages/set-checkpoint/set-current-tab-checkpoint-message-event-listener.ts";
import { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/messages/set-checkpoint/set-tab-checkpoint-if-unset-message-event-listener.ts";
import { SetCheckpointUseCases } from "./use-cases/set-checkpoint-use-cases";
import { GetCheckpointUseCases } from "./use-cases/get-checkpoint-use-cases";
import { ClearCheckpointUseCases } from "./use-cases/clear-checkpoint-use-cases";
import { ResetTabToCheckpointUseCases } from "./use-cases/reset-tab-to-checkpoint-use-cases";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";
import { CheckpointRepository } from "./domain/interfaces/checkpoint-repository";
import { ChromeStorageCheckpointRepository } from "./infrastructure/chrome-storage-checkpoint-repository";
import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import { GetCurrentTabCheckpointMessageEventListener } from "./presentation/messages/get-checkpoint/get-current-tab-checkpoint-message-event-listener.ts";
import { GetCheckpointMessageEventSender } from "./presentation/messages/get-checkpoint/_get-checkpoint-message-event-sender.ts";
import { ClearCurrentTabCheckpointMessageEventListener } from "./presentation/messages/clear-checkpoint/clear-current-tab-checkpoint-message-event-listener.ts";
import { ClearTabCheckpointMessageEventListener } from "./presentation/messages/clear-checkpoint/clear-tab-checkpoint-message-event-listener.ts";
import { ClearCheckpointMessageEventSender } from "./presentation/messages/clear-checkpoint/_clear-checkpoint-message-event-sender.ts";
import { ResetCurrentTabToCheckpointMessageEventListener } from "./presentation/messages/reset-tab-to-checkpoint/reset-current-tab-to-checkpoint-message-event-listener.ts";
import { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./presentation/messages/reset-tab-to-checkpoint/reset-or-close-current-tab-to-checkpoint-message-event-listener.ts";
import { ResetTabToCheckpointMessageEventSender } from "./presentation/messages/reset-tab-to-checkpoint/_reset-tab-to-checkpoint-message-event-sender.ts";
import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";
import { SetCurrentTabCheckpointShortcutListener } from "./presentation/shortcuts/set-current-tab-checkpoint-shortcut-listener.ts";
import { ClearCurrentTabCheckpointShortcutListener } from "./presentation/shortcuts/clear-current-tab-checkpoint-shortcut-listener.ts";
import { ResetCurrentTabToCheckpointShortcutListener } from "./presentation/shortcuts/reset-current-tab-to-checkpoint-shortcut-listener.ts";
import { ResetOrCloseCurrentTabToCheckpointShortcutListener } from "./presentation/shortcuts/reset-or-close-current-tab-to-checkpoint-shortcut-listener.ts";
import { SetCurrentTabCheckpointContextMenuListener } from "./presentation/context-menu/set-current-tab-checkpoint-context-menu-listener.ts";
import { ResetCurrentTabToCheckpointContextMenuListener } from "./presentation/context-menu/reset-current-tab-to-checkpoint-context-menu-listener.ts";
import { ClearCurrentTabCheckpointContextMenuListener } from "./presentation/context-menu/clear-current-tab-checkpoint-context-menu-listener.ts";
import { OnTabCloseRemoveCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-close-delete-checkpoint.ts";
import { OnTabPinSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-pin-set-checkpoint.ts";
import { OnTabSetToGroupSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-set-to-group-set-checkpoint.ts";
import { OnTabCreatePinnedSetCheckpoint } from "./presentation/browser-events/tab-event-listeners/on-tab-create-pinned-checkpoint.ts";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import type { BrowserShortcutSettingsService } from "@repo/shared/domain/interfaces/browser-shortcut-settings-service";
import { ChromeShortcutSettingsService } from "@repo/shared/infrastructure/chrome-shortcut-settings-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ChromeStorageSettingsRepository } from "@repo/shared/infrastructure/chrome-storage-settings-repository";
import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import { ChromeContextMenuService } from "@repo/shared/infrastructure/chrome-context-menu-service";
import { SettingsUseCases } from "./use-cases/settings-use-cases";
import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";
import { OnExtensionInstalledLoadDefaultSettings } from "./presentation/browser-events/extension-event-listeners/on-extension-installed-load-default-settings.ts";

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
  private static settingsUseCases: SettingsUseCases;
  static getSettingsUseCases(): SettingsUseCases {
    if (this.settingsUseCases) {
      return this.settingsUseCases;
    }

    this.settingsUseCases = new SettingsUseCases(
      DependencyProvider.getSettingsRepository(),
      DependencyProvider.getBrowserContextMenuService(),
      DependencyProvider.getContextMenuListeners(),
    );

    return this.settingsUseCases;
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
        DependencyProvider.getSettingsUseCases(),
      ),
    ];

    return this.onExtensionInstalledListeners;
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
    ];

    return this.shortcutListeners;
  }

  //Presentation - Tab event listeners
  private static onCloseTabEventListeners: TabEventListener[];
  static getOnCloseTabEventListeners(): TabEventListener[] {
    if (this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
      new OnTabCloseRemoveCheckpoint(DependencyProvider.getClearCheckpointUseCases()),
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
      new OnTabSetToGroupSetCheckpoint(DependencyProvider.getSetCheckpointUseCases()),
    ];

    return this.onUpdateTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if (this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetCheckpoint(DependencyProvider.getSetCheckpointUseCases()),
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
    ];

    return this.messageEventListeners;
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
}
