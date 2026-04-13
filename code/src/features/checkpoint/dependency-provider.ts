import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import { ChromeStorageCheckpointRepository } from "./infrastructure/chrome-storage-checkpoint-repository";
import { SetCheckpointUseCases } from "./use-cases/set-checkpoint-use-cases";
import { ResetTabToCheckpointUseCases } from "./use-cases/reset-tab-to-checkpoint-use-cases";
import { GetCheckpointUseCases } from "./use-cases/get-checkpoint-use-cases";
import { ClearCheckpointUseCases } from "./use-cases/clear-checkpoint-use-cases";
import { ClearCheckpointMessageEventSender } from "./presentation/background/message-events/clear-checkpoint-message-event-sender";
import type { BrowserTabsService as BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CheckpointRepository } from "./domain/interfaces/checkpoint-repository";
import { ChromeShortcutSettingsService } from "@/shared/infrastructure/chrome-shortcut-settings-service";
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";
import { ChromeStorageSettingsRepository } from "@/shared/infrastructure/chrome-storage-settings-repository";
import { SettingsUseCases } from "./use-cases/settings-use-cases";
import { ResetCurrentTabToCheckpointContextMenuListener } from "./presentation/background/context-menu-listeners/reset-current-tab-to-checkpoint-context-menu-listener";
import { SetCurrentTabCheckpointContextMenuListener } from "./presentation/background/context-menu-listeners/set-current-tab-checkpoint-context-menu-listener";
import { ClearCurrentTabCheckpointContextMenuListener } from "./presentation/background/context-menu-listeners/clear-current-tab-checkpoint-context-menu-listener";
import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { SetCurrentTabCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/set-current-tab-checkpoint-shortcut-listener";
import { ClearCurrentTabCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/clear-current-tab-checkpoint-shortcut-listener";
import { ResetCurrentTabToCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/reset-current-tab-to-checkpoint-shortcut-listener";
import { ResetOrCloseCurrentTabToCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/reset-or-close-current-tab-to-checkpoint-shortcut-listener";
import { OnTabCloseRemoveCheckpoint } from "./presentation/background/tab-event-listeners/on-tab-close-delete-checkpoint";
import { OnTabPinSetCheckpoint } from "./presentation/background/tab-event-listeners/on-tab-pin-set-checkpoint";
import { OnTabSetToGroupSetCheckpoint } from "./presentation/background/tab-event-listeners/on-tab-set-to-group-set-checkpoint";
import { OnTabCreatePinnedSetCheckpoint } from "./presentation/background/tab-event-listeners/on-tab-create-pinned-checkpoint";
import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import { ChromeContextMenuService } from "@/shared/infrastructure/chrome-context-menu-service";
import type { BrowserContextMenuService } from "@/shared/domain/interfaces/browser-context-menu-service";
import type { ExtensionListener } from "@/shared/domain/models/extension-listener";
import { OnExtensionInstalledLoadDefaultSettings } from "./presentation/background/extension-listeners/on-extension-installed-load-default-settings";
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service"
import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ClearCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/clear-checkpoint-use-cases-listeners/clear-current-tab-checkpoint-message-event-listener";
import { ClearTabCheckpointMessageEventListener } from "./presentation/background/message-events/clear-checkpoint-use-cases-listeners/clear-tab-checkpoint-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import { SetCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-current-tab-checkpoint-message-event-listener";
import { SetCheckpointMessageEventSender } from "./presentation/background/message-events/set-checkpoint-message-event-sender";
import { ResetCurrentTabToCheckpointMessageEventListener } from "./presentation/background/message-events/reset-tab-to-checkpoint-use-cases-listeners/reset-current-tab-to-checkpoint-message-event-listener";
import { ResetTabToCheckpointMessageEventSender } from "./presentation/background/message-events/reset-tab-to-checkpoint-message-event-sender";
import { GetCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/get-checkpoint-use-cases-listeners/get-current-tab-checkpoint-message-event-listener";
import { GetCheckpointMessageEventSender } from "./presentation/background/message-events/get-checkpoint-message-event-sender";
import { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./presentation/background/message-events/reset-tab-to-checkpoint-use-cases-listeners/reset-or-close-current-tab-to-checkpoint-message-event-listener";
import { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-tab-checkpoint-if-unset-message-event-listener";

export class CheckpointDependencyProvider {

  private constructor(){
  }

  //Infrastructure - Data
  private static checkpointRepository: CheckpointRepository;
  static getCheckpointRepository(): CheckpointRepository {
    if(this.checkpointRepository) {
      return this.checkpointRepository;
    }

    this.checkpointRepository = new ChromeStorageCheckpointRepository();
    return this.checkpointRepository;
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
  private static setCheckpointUseCases: SetCheckpointUseCases;
  static getSetCheckpointUseCases(): SetCheckpointUseCases {
    if(this.setCheckpointUseCases) {
      return this.setCheckpointUseCases;
    }

    this.setCheckpointUseCases = new SetCheckpointUseCases(
      CheckpointDependencyProvider.getBrowserTabsService(),
      CheckpointDependencyProvider.getCheckpointRepository(),
    );

    return this.setCheckpointUseCases;
  }

  private static resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;
  static getResetTabToCheckpointUseCases(): ResetTabToCheckpointUseCases {
    if(this.resetTabToCheckpointUseCases) {
      return this.resetTabToCheckpointUseCases;
    }

    this.resetTabToCheckpointUseCases = new ResetTabToCheckpointUseCases(
      CheckpointDependencyProvider.getBrowserTabsService(),
      CheckpointDependencyProvider.getCheckpointRepository(),
    );

    return this.resetTabToCheckpointUseCases;
  }

  private static getCheckpointUseCases: GetCheckpointUseCases;
  static getGetCheckpointUseCases(): GetCheckpointUseCases {
    if(this.getCheckpointUseCases) {
      return this.getCheckpointUseCases;
    }

    this.getCheckpointUseCases = new GetCheckpointUseCases(
      CheckpointDependencyProvider.getBrowserTabsService(),
      CheckpointDependencyProvider.getCheckpointRepository(),
    );

    return this.getCheckpointUseCases;
  }

  private static clearCheckpointUseCases: ClearCheckpointUseCases;
  static getClearCheckpointUseCases(): ClearCheckpointUseCases {
    if(this.clearCheckpointUseCases) {
      return this.clearCheckpointUseCases;
    }

    this.clearCheckpointUseCases = new ClearCheckpointUseCases(CheckpointDependencyProvider.getBrowserTabsService(), CheckpointDependencyProvider.getCheckpointRepository());
    return this.clearCheckpointUseCases;
  }

  private static settingsUseCases: SettingsUseCases;
  static getSettingsUseCases(): SettingsUseCases {
    if(this.settingsUseCases) {
      return this.settingsUseCases;
    }

    this.settingsUseCases = new SettingsUseCases(
      CheckpointDependencyProvider.getSettingsRepository(),
      CheckpointDependencyProvider.getBrowserContextMenuService(),
      CheckpointDependencyProvider.getContextMenuListeners(),
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
      new SetCurrentTabCheckpointContextMenuListener(CheckpointDependencyProvider.getSetCheckpointUseCases()),
      new ResetCurrentTabToCheckpointContextMenuListener(CheckpointDependencyProvider.getResetTabToCheckpointUseCases()),
      new ClearCurrentTabCheckpointContextMenuListener(CheckpointDependencyProvider.getClearCheckpointUseCases()),
    ];

    CheckpointDependencyProvider.getSettingsUseCases();

    return this.contextMenuListeners;
  }

  //Presentation - Extension event listeners
  private static onExtensionInstalledListeners: ExtensionListener[];
  static getOnExtensionInstalledListeners(): ExtensionListener[] {
    if(this.onExtensionInstalledListeners) {
      return this.onExtensionInstalledListeners;
    }

    this.onExtensionInstalledListeners = [
      new OnExtensionInstalledLoadDefaultSettings(CheckpointDependencyProvider.getSettingsUseCases()),
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
      new SetCurrentTabCheckpointShortcutListener(CheckpointDependencyProvider.getSetCheckpointUseCases()),
      new ClearCurrentTabCheckpointShortcutListener(CheckpointDependencyProvider.getClearCheckpointUseCases()),
      new ResetCurrentTabToCheckpointShortcutListener(CheckpointDependencyProvider.getResetTabToCheckpointUseCases()),
      new ResetOrCloseCurrentTabToCheckpointShortcutListener(CheckpointDependencyProvider.getResetTabToCheckpointUseCases()),
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
      new OnTabCloseRemoveCheckpoint(CheckpointDependencyProvider.getClearCheckpointUseCases()),
    ];

    return this.onCloseTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if(this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetCheckpoint(CheckpointDependencyProvider.getSetCheckpointUseCases()),
    ];

    return this.onCreateTabEventListeners;
  }

  private static onUpdateTabEventListeners: TabEventListener[];
  static getOnUpdateTabEventListeners(): TabEventListener[] {
    if(this.onUpdateTabEventListeners) {
      return this.onUpdateTabEventListeners;
    }

    this.onUpdateTabEventListeners = [
      new OnTabPinSetCheckpoint(CheckpointDependencyProvider.getSetCheckpointUseCases()),
      new OnTabSetToGroupSetCheckpoint(CheckpointDependencyProvider.getSetCheckpointUseCases()),
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
      ...CheckpointDependencyProvider.getClearCheckpointUseCaseMessageEventListeners(),
      ...CheckpointDependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
      ...CheckpointDependencyProvider.getResetTabToCheckpointUseCaseMessageEventListeners(),
      ...CheckpointDependencyProvider.getGetCheckpointUseCaseMessageEventListeners(),
    ];

    return this.messageEventListeners;
  }

  private static clearCheckpointUseCaseListeners: [ClearCurrentTabCheckpointMessageEventListener, ClearTabCheckpointMessageEventListener];
  static getClearCheckpointUseCaseMessageEventListeners(): [ClearCurrentTabCheckpointMessageEventListener, ClearTabCheckpointMessageEventListener] {
    if(this.clearCheckpointUseCaseListeners) {
      return this.clearCheckpointUseCaseListeners;
    }

    this.clearCheckpointUseCaseListeners = [
      new ClearCurrentTabCheckpointMessageEventListener(CheckpointDependencyProvider.getClearCheckpointUseCases()),
      new ClearTabCheckpointMessageEventListener(CheckpointDependencyProvider.getClearCheckpointUseCases()),
    ];

    return this.clearCheckpointUseCaseListeners;
  }

  private static getCheckpointUseCaseListeners: [GetCurrentTabCheckpointMessageEventListener];
  static getGetCheckpointUseCaseMessageEventListeners(): [GetCurrentTabCheckpointMessageEventListener] {
    if(this.getCheckpointUseCaseListeners) {
      return this.getCheckpointUseCaseListeners;
    }

    this.getCheckpointUseCaseListeners = [
      new GetCurrentTabCheckpointMessageEventListener(CheckpointDependencyProvider.getGetCheckpointUseCases()),
    ];

    return this.getCheckpointUseCaseListeners;
  }

  private static resetTabToCheckpointUseCaseListeners: [ResetCurrentTabToCheckpointMessageEventListener, ResetOrCloseCurrentTabToCheckpointMessageEventListener];
  static getResetTabToCheckpointUseCaseMessageEventListeners(): [ResetCurrentTabToCheckpointMessageEventListener, ResetOrCloseCurrentTabToCheckpointMessageEventListener] {
    if(this.resetTabToCheckpointUseCaseListeners) {
      return this.resetTabToCheckpointUseCaseListeners;
    }

    this.resetTabToCheckpointUseCaseListeners = [
      new ResetCurrentTabToCheckpointMessageEventListener(CheckpointDependencyProvider.getResetTabToCheckpointUseCases()),
      new ResetOrCloseCurrentTabToCheckpointMessageEventListener(CheckpointDependencyProvider.getResetTabToCheckpointUseCases()),
    ];

    return this.resetTabToCheckpointUseCaseListeners;
  }

  private static setCheckpointUseCaseListeners: [SetCurrentTabCheckpointMessageEventListener, SetTabCheckpointIfUnsetMessageEventListener];
  static getSetCheckpointUseCaseMessageEventListeners(): [SetCurrentTabCheckpointMessageEventListener, SetTabCheckpointIfUnsetMessageEventListener] {
    if(this.setCheckpointUseCaseListeners) {
      return this.setCheckpointUseCaseListeners;
    }

    this.setCheckpointUseCaseListeners = [
      new SetCurrentTabCheckpointMessageEventListener(CheckpointDependencyProvider.getSetCheckpointUseCases()),
      new SetTabCheckpointIfUnsetMessageEventListener(CheckpointDependencyProvider.getSetCheckpointUseCases()),
    ];

    return this.setCheckpointUseCaseListeners;
  }

  //Presentation - Message events - Senders
  private static clearCheckpointMessageEventSender: ClearCheckpointMessageEventSender;
  static getClearCheckpointMessageEventSender(): ClearCheckpointMessageEventSender {
    if(this.clearCheckpointMessageEventSender) {
      return this.clearCheckpointMessageEventSender;
    }

    this.clearCheckpointMessageEventSender = new ClearCheckpointMessageEventSender(
      CheckpointDependencyProvider.getBrowserMessageService(),
      CheckpointDependencyProvider.getClearCheckpointUseCaseMessageEventListeners(),
    );

    return this.clearCheckpointMessageEventSender;
  }

  private static getCheckpointMessageEventSender: GetCheckpointMessageEventSender;
  static getGetCheckpointMessageEventSender(): GetCheckpointMessageEventSender {
    if(this.getCheckpointMessageEventSender) {
      return this.getCheckpointMessageEventSender;
    }

    this.getCheckpointMessageEventSender = new GetCheckpointMessageEventSender(
      CheckpointDependencyProvider.getBrowserMessageService(),
      CheckpointDependencyProvider.getGetCheckpointUseCaseMessageEventListeners(),
    );

    return this.getCheckpointMessageEventSender;
  }

  private static resetTabToCheckpointMessageEventSender: ResetTabToCheckpointMessageEventSender;
  static getResetTabToCheckpointMessageEventSender(): ResetTabToCheckpointMessageEventSender {
    if(this.resetTabToCheckpointMessageEventSender) {
      return this.resetTabToCheckpointMessageEventSender;
    }

    this.resetTabToCheckpointMessageEventSender = new ResetTabToCheckpointMessageEventSender(
      CheckpointDependencyProvider.getBrowserMessageService(),
      CheckpointDependencyProvider.getResetTabToCheckpointUseCaseMessageEventListeners(),
    );

    return this.resetTabToCheckpointMessageEventSender;
  }

  private static setCheckpointMessageEventSender: SetCheckpointMessageEventSender;
  static getSetCheckpointMessageEventSender(): SetCheckpointMessageEventSender {
    if(this.setCheckpointMessageEventSender) {
      return this.setCheckpointMessageEventSender;
    }

    this.setCheckpointMessageEventSender = new SetCheckpointMessageEventSender(
      CheckpointDependencyProvider.getBrowserMessageService(),
      CheckpointDependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
    );

    return this.setCheckpointMessageEventSender;
  }

}
