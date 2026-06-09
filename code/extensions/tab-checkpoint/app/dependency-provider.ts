import { SetCheckpointMessageEventSender } from "./presentation/pop-up/background/message-events/set-checkpoint-message-event-sender";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { SetCurrentTabCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/set-checkpoint-use-cases-listeners/set-current-tab-checkpoint-message-event-listener";
import { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/pop-up/background/message-events/set-checkpoint-use-cases-listeners/set-tab-checkpoint-if-unset-message-event-listener";
import { SetCheckpointUseCases } from "./use-cases/set-checkpoint-use-cases";
import { GetCheckpointUseCases } from "./use-cases/get-checkpoint-use-cases";
import { ClearCheckpointUseCases } from "./use-cases/clear-checkpoint-use-cases";
import { ResetTabToCheckpointUseCases } from "./use-cases/reset-tab-to-checkpoint-use-cases";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";
import { CheckpointRepository } from "./domain/interfaces/checkpoint-repository";
import { ChromeStorageCheckpointRepository } from "./infrastructure/chrome-storage-checkpoint-repository";
import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import { GetCurrentTabCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/get-checkpoint-use-cases-listeners/get-current-tab-checkpoint-message-event-listener";
import { GetCheckpointMessageEventSender } from "./presentation/pop-up/background/message-events/get-checkpoint-message-event-sender";
import { ClearCurrentTabCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/clear-checkpoint-use-cases-listeners/clear-current-tab-checkpoint-message-event-listener";
import { ClearTabCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/clear-checkpoint-use-cases-listeners/clear-tab-checkpoint-message-event-listener";
import { ClearCheckpointMessageEventSender } from "./presentation/pop-up/background/message-events/clear-checkpoint-message-event-sender";
import { ResetCurrentTabToCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/reset-tab-to-checkpoint-use-cases-listeners/reset-current-tab-to-checkpoint-message-event-listener";
import { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./presentation/pop-up/background/message-events/reset-tab-to-checkpoint-use-cases-listeners/reset-or-close-current-tab-to-checkpoint-message-event-listener";
import { ResetTabToCheckpointMessageEventSender } from "./presentation/pop-up/background/message-events/reset-tab-to-checkpoint-message-event-sender";
import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";
import { SetCurrentTabCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/set-current-tab-checkpoint-shortcut-listener";
import { ClearCurrentTabCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/clear-current-tab-checkpoint-shortcut-listener";
import { ResetCurrentTabToCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/reset-current-tab-to-checkpoint-shortcut-listener";
import { ResetOrCloseCurrentTabToCheckpointShortcutListener } from "./presentation/background/shortcut-listeners/reset-or-close-current-tab-to-checkpoint-shortcut-listener";

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
  //Presentation - Context menu listeners
  //Presentation - Extension event listeners
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
