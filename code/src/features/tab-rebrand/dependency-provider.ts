import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import type { CustomNameRepository } from "./domain/interfaces/custom-name-repository";
import { ChromeStorageCustomNameRepository } from "./infrastructure/chrome-storage-custom-name-respository";
import { SetTabCustomNameMessageEventSender } from "./presentation/background/message-events/set-tab-custom-name-message-event-senders";
import { GetTabCustomNameMessageEventSender } from "./presentation/background/message-events/get-tab-custom-name-message-event-senders";
import { SetCurrentTabCustomNameMessageEventListener } from "./presentation/background/message-events/set-custom-name-use-cases-listeners/set-current-tab-custom-name-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import { SetTabCustomNameUseCases } from "./use-cases/set-tab-custom-name-use-cases";
import { GetCurrentTabCustomNameMessageEventListener } from "./presentation/background/message-events/get-custom-name-use-cases-listeners/get-current-tab-custom-name-message-event-listener";
import { GetTabCustomNameUseCases } from "./use-cases/get-tab-custom-name-use-cases";

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

  private static getTabCustomNameUseCases: GetTabCustomNameUseCases;
  static getGetTabCustomNameUseCases(): GetTabCustomNameUseCases {
      if(this.getTabCustomNameUseCases) {
        return this.getTabCustomNameUseCases;
      }
      this.getTabCustomNameUseCases = new GetTabCustomNameUseCases(
        TabRebrandDependencyProvider.getBrowserTabsService(),
        TabRebrandDependencyProvider.getTabCustomNameRepository());
      return this.getTabCustomNameUseCases;
  }

  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if(this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      ...TabRebrandDependencyProvider.getSetCurrentTabCustomNameMessageEventListener(),
      ...TabRebrandDependencyProvider.getGetCurrentTabCustomNameMessageEventListener(),
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

  private static getCurrentTabCustomNameMessageEventListener: [GetCurrentTabCustomNameMessageEventListener];
  static getGetCurrentTabCustomNameMessageEventListener(): [GetCurrentTabCustomNameMessageEventListener] {
    if(this.getCurrentTabCustomNameMessageEventListener) {
      return this.getCurrentTabCustomNameMessageEventListener;
    }

    this.getCurrentTabCustomNameMessageEventListener = [
        new GetCurrentTabCustomNameMessageEventListener(TabRebrandDependencyProvider.getGetTabCustomNameUseCases())
    ];
    return this.getCurrentTabCustomNameMessageEventListener;
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

  private static getTabCustomNameMessageEventSender: GetTabCustomNameMessageEventSender;
  static getGetTabCustomNameMessageEventSender(): GetTabCustomNameMessageEventSender {
    if (this.getTabCustomNameMessageEventSender) {
      return this.getTabCustomNameMessageEventSender;
    }

    this.getTabCustomNameMessageEventSender = new GetTabCustomNameMessageEventSender(
        TabRebrandDependencyProvider.getBrowserMessageService(),
        TabRebrandDependencyProvider.getGetCurrentTabCustomNameMessageEventListener());

    return this.getTabCustomNameMessageEventSender;
  }
}