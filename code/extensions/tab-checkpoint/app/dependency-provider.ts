import { SetCheckpointMessageEventSender } from "./presentation/background/message-events/set-checkpoint-message-event-sender";
import { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@repo/shared/infrastructure/chrome-message-service";
import { SetCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-current-tab-checkpoint-message-event-listener";
import { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-tab-checkpoint-if-unset-message-event-listener";
import { SetCheckpointUseCases } from "./use-cases/set-checkpoint-use-cases";
import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@repo/shared/infrastructure/chrome-tabs-service";
import { CheckpointRepository } from "./domain/interfaces/checkpoint-repository";
import { ChromeStorageCheckpointRepository } from "./infrastructure/chrome-storage-checkpoint-repository";
import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

export class DependencyProvider {

  //Infrastructure - Data
  private static checkpointRepository: CheckpointRepository;
  static getCheckpointRepository(): CheckpointRepository {
    if(this.checkpointRepository) {
      return this.checkpointRepository;
    }

    this.checkpointRepository = new ChromeStorageCheckpointRepository();
    return this.checkpointRepository;
  }

  //Infrastructure - Browser
  private static browserMessageService: BrowserMessageService;
  static getBrowserMessageService(): BrowserMessageService {
    if(this.browserMessageService) {
      return this.browserMessageService;
    }

    this.browserMessageService = new ChromeMessageService();
    return this.browserMessageService;
  }

  private static browserTabsService: BrowserTabsService;
  static getBrowserTabsService(): BrowserTabsService {
    if(this.browserTabsService) {
      return this.browserTabsService;
    }

    this.browserTabsService = new ChromeTabsService();
    return this.browserTabsService;
  }
  //Use cases
  private static setCheckpointUseCases: SetCheckpointUseCases;
  static getSetCheckpointUseCases(): SetCheckpointUseCases {
    if(this.setCheckpointUseCases) {
      return this.setCheckpointUseCases;
    }

    this.setCheckpointUseCases = new SetCheckpointUseCases(
      DependencyProvider.getBrowserTabsService(),
      DependencyProvider.getCheckpointRepository(),
    );

    return this.setCheckpointUseCases;
  }
  //Presentation - Context menu listeners
  //Presentation - Extension event listeners
  //Presentation - Shortcut listeners
  //Presentation - Tab event listeners
  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if(this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      //...DependencyProvider.getClearCheckpointUseCaseMessageEventListeners(),
      ...DependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
      //...DependencyProvider.getResetTabToCheckpointUseCaseMessageEventListeners(),
      //...DependencyProvider.getGetCheckpointUseCaseMessageEventListeners(),
    ];

    return this.messageEventListeners;
  }

  private static setCheckpointUseCaseListeners: [SetCurrentTabCheckpointMessageEventListener, SetTabCheckpointIfUnsetMessageEventListener];
  static getSetCheckpointUseCaseMessageEventListeners(): [SetCurrentTabCheckpointMessageEventListener, SetTabCheckpointIfUnsetMessageEventListener] {
    if(this.setCheckpointUseCaseListeners) {
      return this.setCheckpointUseCaseListeners;
    }

    this.setCheckpointUseCaseListeners = [
      new SetCurrentTabCheckpointMessageEventListener(DependencyProvider.getSetCheckpointUseCases()),
      new SetTabCheckpointIfUnsetMessageEventListener(DependencyProvider.getSetCheckpointUseCases()),
    ];

    return this.setCheckpointUseCaseListeners;
  }
  //Presentation - Message events - Senders
  private static setCheckpointMessageEventSender: SetCheckpointMessageEventSender;
  static getSetCheckpointMessageEventSender(): SetCheckpointMessageEventSender {
    if(this.setCheckpointMessageEventSender) {
      return this.setCheckpointMessageEventSender;
    }

    this.setCheckpointMessageEventSender = new SetCheckpointMessageEventSender(
      DependencyProvider.getBrowserMessageService(),
      DependencyProvider.getSetCheckpointUseCaseMessageEventListeners(),
    );

    return this.setCheckpointMessageEventSender;
  }  
}