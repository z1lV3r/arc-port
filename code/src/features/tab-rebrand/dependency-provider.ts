import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import type { CustomNameRepository } from "./domain/interfaces/custom-name-repository";
import { ChromeStorageCustomNameRepository } from "./infrastructure/chrome-storage-custom-name-respository";
import { SetTabCustomNameMessageEventSender } from "./presentation/background/message-events/set-tab-custom-name-message-event-senders";
import { SetCurrentTabCustomNameMessageEventListener } from "./presentation/background/message-events/set-custom-name-use-cases-listeners/set-current-tab-custom-name-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import { SetTabCustomNameUseCases } from "./use-cases/set-tab-custom-name-use-cases";

export class TabRebrandDependencyProvider {
  private constructor() {
    return;
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

  private static tabCustomNameRepository: CustomNameRepository;
  static getTabCustomNameRepository(): CustomNameRepository {
    if(this.tabCustomNameRepository) {
      return this.tabCustomNameRepository;
    }
    this.tabCustomNameRepository = new ChromeStorageCustomNameRepository();
    return this.tabCustomNameRepository;
  }

  //Use cases
  private static setTabCustomNameUseCases: SetTabCustomNameUseCases;
  static getSetTabCustomNameUseCases(): SetTabCustomNameUseCases {
      if(this.setTabCustomNameUseCases) {
        return this.setTabCustomNameUseCases;
      }
      this.setTabCustomNameUseCases = new SetTabCustomNameUseCases(
        TabRebrandDependencyProvider.getBrowserTabsService(),
        TabRebrandDependencyProvider.getTabCustomNameRepository());
      return this.setTabCustomNameUseCases;
  }

  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if(this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      ...TabRebrandDependencyProvider.getSetCurrentTabCustomNameMessageEventListener(),
    ];

    return this.messageEventListeners;
  }

  private static setCurrentTabCustomNameMessageEventListener: [SetCurrentTabCustomNameMessageEventListener];
  static getSetCurrentTabCustomNameMessageEventListener(): [SetCurrentTabCustomNameMessageEventListener] {
    if(this.setCurrentTabCustomNameMessageEventListener) {
      return this.setCurrentTabCustomNameMessageEventListener;
    }

    this.setCurrentTabCustomNameMessageEventListener = [
        new SetCurrentTabCustomNameMessageEventListener(TabRebrandDependencyProvider.getSetTabCustomNameUseCases())
    ];
    return this.setCurrentTabCustomNameMessageEventListener;
  }

  //Presentation - Message events - Senders
  private static setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender;
  static getSetTabCustomNameMessageEventSender(): SetTabCustomNameMessageEventSender {
    if (this.setTabCustomNameMessageEventSender) {
      return this.setTabCustomNameMessageEventSender;
    }

    this.setTabCustomNameMessageEventSender = new SetTabCustomNameMessageEventSender(
        TabRebrandDependencyProvider.getBrowserMessageService(),
        TabRebrandDependencyProvider.getSetCurrentTabCustomNameMessageEventListener());

    return this.setTabCustomNameMessageEventSender;
  }
}