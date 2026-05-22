import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { ChromeTabsService } from "@/shared/infrastructure/chrome-tabs-service";
import type { CustomNameRepository } from "./domain/interfaces/custom-name-repository";
import { ChromeStorageCustomNameRepository } from "./infrastructure/chrome-storage-custom-name-respository";
import { SetTabCustomNameMessageEventSender } from "./presentation/custom-name/background/message-events/set-tab-custom-name-message-event-senders";
import { GetTabCustomNameMessageEventSender } from "./presentation/custom-name/background/message-events/get-tab-custom-name-message-event-senders";
import { SetCurrentTabCustomNameMessageEventListener } from "./presentation/custom-name/background/message-events/set-custom-name-use-cases-listeners/set-current-tab-custom-name-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import { SetTabCustomNameUseCases } from "./use-cases/custom-name/set-tab-custom-name-use-cases";
import { GetCurrentTabCustomNameMessageEventListener } from "./presentation/custom-name/background/message-events/get-custom-name-use-cases-listeners/get-current-tab-custom-name-message-event-listener";
import { GetTabCustomNameUseCases } from "./use-cases/custom-name/get-tab-custom-name-use-cases";
import { ClearTabCustomNameMessageEventSender } from "./presentation/custom-name/background/message-events/clear-tab-custom-name-message-event-senders";
import { ClearCurrentTabCustomNameMessageEventListener } from "./presentation/custom-name/background/message-events/clear-custom-name-use-cases-listeners/clear-current-tab-custom-name-message-event-listener";
import { ClearTabCustomNameUseCases } from "./use-cases/custom-name/clear-tab-custom-name-use-cases";
import { SetTabCustomIconMessageEventSender } from "./presentation/custom-icon/background/message-events/set-tab-custom-icon-message-event-senders";
import { SetCurrentTabCustomIconMessageEventListener } from "./presentation/custom-icon/background/message-events/set-icon-use-cases-listeners/set-current-tab-custom-icon-message-event-listener";
import type { CustomIconRepository } from "./domain/interfaces/custom-icon-repository";
import { ChromeStorageCustomIconRepository } from "./infrastructure/chrome-storage-custom-icon-repository";
import { SetTabCustomIconUseCases } from "./use-cases/custom-icon/set-tab-custom-icon-use-cases";
import { GetTabCustomIconMessageEventSender } from "./presentation/custom-icon/background/message-events/get-tab-custom-icon-message-event-senders";
import { GetCurrentTabCustomIconMessageEventListener } from "./presentation/custom-icon/background/message-events/get-icon-use-cases-listeners/get-current-tab-custom-icon-message-event-listener";
import { ClearCurrentTabCustomIconMessageEventListener } from "./presentation/custom-icon/background/message-events/clear-icon-use-cases-listeners/clear-current-tab-custom-icon-message-event-listener";
import { GetTabCustomIconUseCases } from "./use-cases/custom-icon/get-tab-custom-icon-use-cases";
import { ClearTabCustomIconMessageEventSender } from "./presentation/custom-icon/background/message-events/clear-tab-custom-icon-message-event-senders";
import { ClearTabCustomIconUseCases } from "./use-cases/custom-icon/clear-tab-custom-icon-use-cases";
import type { OriginalNameRepository } from "./domain/interfaces/original-name-repository";
import { ChromeStorageOriginalNameRepository } from "./infrastructure/chrome-storage-original-name-repository";
import type { OriginalTabInformationService } from "./domain/interfaces/original-tab-information-service";
import { ChromeOriginalTabInformationService } from "./infrastructure/chrome-original-tab-information-service";
import type { OriginalIconRepository } from "./domain/interfaces/original-icon-repository";
import { ChromeStorageOriginalIconRepository } from "./infrastructure/chrome-storage-original-icon-repository";

export class TabRebrandDependencyProvider {
  private constructor() {
    return;
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

  private static originalTabInformationService: OriginalTabInformationService;
  static getOriginalTabInformationService(): OriginalTabInformationService {
    if (this.originalTabInformationService) {
      return this.originalTabInformationService;
    }
    this.originalTabInformationService = new ChromeOriginalTabInformationService(TabRebrandDependencyProvider.getBrowserTabsService());
    return this.originalTabInformationService;
  }

  private static tabCustomNameRepository: CustomNameRepository;
  static getTabCustomNameRepository(): CustomNameRepository {
    if (this.tabCustomNameRepository) {
      return this.tabCustomNameRepository;
    }
    this.tabCustomNameRepository = new ChromeStorageCustomNameRepository();
    return this.tabCustomNameRepository;
  }

  private static originalNameRepository: OriginalNameRepository;
  static getOriginalNameRepository(): OriginalNameRepository {
    if (this.originalNameRepository) {
      return this.originalNameRepository;
    }
    this.originalNameRepository = new ChromeStorageOriginalNameRepository();
    return this.originalNameRepository;
  }

  private static tabCustomIconRepository: CustomIconRepository;
  static getTabCustomIconRepository(): CustomIconRepository {
    if (this.tabCustomIconRepository) {
      return this.tabCustomIconRepository;
    }
    this.tabCustomIconRepository = new ChromeStorageCustomIconRepository();
    return this.tabCustomIconRepository;
  }

  private static tabOriginalIconRepository: OriginalIconRepository;
  static getTabOriginalIconRepository(): OriginalIconRepository {
    if (this.tabOriginalIconRepository) {
      return this.tabOriginalIconRepository;
    }
    this.tabOriginalIconRepository = new ChromeStorageOriginalIconRepository();
    return this.tabOriginalIconRepository;
  }

  //Use cases
  private static setTabCustomNameUseCases: SetTabCustomNameUseCases;
  static getSetTabCustomNameUseCases(): SetTabCustomNameUseCases {
    if (this.setTabCustomNameUseCases) {
      return this.setTabCustomNameUseCases;
    }
    this.setTabCustomNameUseCases = new SetTabCustomNameUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getTabCustomNameRepository(),
      TabRebrandDependencyProvider.getOriginalNameRepository());
    return this.setTabCustomNameUseCases;
  }

  private static getTabCustomNameUseCases: GetTabCustomNameUseCases;
  static getGetTabCustomNameUseCases(): GetTabCustomNameUseCases {
    if (this.getTabCustomNameUseCases) {
      return this.getTabCustomNameUseCases;
    }
    this.getTabCustomNameUseCases = new GetTabCustomNameUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getTabCustomNameRepository());
    return this.getTabCustomNameUseCases;
  }

  private static clearTabCustomNameUseCases: ClearTabCustomNameUseCases;
  static getClearTabCustomNameUseCases(): ClearTabCustomNameUseCases {
    if (this.clearTabCustomNameUseCases) {
      return this.clearTabCustomNameUseCases;
    }
    this.clearTabCustomNameUseCases = new ClearTabCustomNameUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getOriginalTabInformationService(),
      TabRebrandDependencyProvider.getTabCustomNameRepository(),
      TabRebrandDependencyProvider.getOriginalNameRepository(),);
    return this.clearTabCustomNameUseCases;
  }

  private static setTabCustomIconUseCases: SetTabCustomIconUseCases;
  static getSetTabCustomIconUseCases(): SetTabCustomIconUseCases {
    if (this.setTabCustomIconUseCases) {
      return this.setTabCustomIconUseCases;
    }
    this.setTabCustomIconUseCases = new SetTabCustomIconUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getTabCustomIconRepository(),
      TabRebrandDependencyProvider.getTabOriginalIconRepository());
    return this.setTabCustomIconUseCases;
  }

  private static getTabCustomIconUseCases: GetTabCustomIconUseCases;
  static getGetTabCustomIconUseCases(): GetTabCustomIconUseCases {
    if (this.getTabCustomIconUseCases) {
      return this.getTabCustomIconUseCases;
    }
    this.getTabCustomIconUseCases = new GetTabCustomIconUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getTabCustomIconRepository());
    return this.getTabCustomIconUseCases;
  }

  private static clearTabCustomIconUseCases: ClearTabCustomIconUseCases;
  static getClearTabCustomIconUseCases(): ClearTabCustomIconUseCases {
    if (this.clearTabCustomIconUseCases) {
      return this.clearTabCustomIconUseCases;
    }
    this.clearTabCustomIconUseCases = new ClearTabCustomIconUseCases(
      TabRebrandDependencyProvider.getBrowserTabsService(),
      TabRebrandDependencyProvider.getTabOriginalIconRepository(),
      TabRebrandDependencyProvider.getTabCustomIconRepository(),
      TabRebrandDependencyProvider.getOriginalTabInformationService());
    return this.clearTabCustomIconUseCases;
  }

  //Presentation - Message events - Listeners
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if (this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      ...TabRebrandDependencyProvider.getSetCurrentTabCustomNameMessageEventListener(),
      ...TabRebrandDependencyProvider.getGetCurrentTabCustomNameMessageEventListener(),
      ...TabRebrandDependencyProvider.getClearCurrentTabCustomNameMessageEventListener(),
      ...TabRebrandDependencyProvider.getSetCurrentTabCustomIconMessageEventListener(),
      ...TabRebrandDependencyProvider.getGetCurrentTabCustomIconMessageEventListener(),
      ...TabRebrandDependencyProvider.getClearCurrentTabCustomIconMessageEventListener(),
    ];

    return this.messageEventListeners;
  }

  private static setCurrentTabCustomNameMessageEventListener: [SetCurrentTabCustomNameMessageEventListener];
  static getSetCurrentTabCustomNameMessageEventListener(): [SetCurrentTabCustomNameMessageEventListener] {
    if (this.setCurrentTabCustomNameMessageEventListener) {
      return this.setCurrentTabCustomNameMessageEventListener;
    }

    this.setCurrentTabCustomNameMessageEventListener = [
      new SetCurrentTabCustomNameMessageEventListener(TabRebrandDependencyProvider.getSetTabCustomNameUseCases())
    ];
    return this.setCurrentTabCustomNameMessageEventListener;
  }

  private static getCurrentTabCustomNameMessageEventListener: [GetCurrentTabCustomNameMessageEventListener];
  static getGetCurrentTabCustomNameMessageEventListener(): [GetCurrentTabCustomNameMessageEventListener] {
    if (this.getCurrentTabCustomNameMessageEventListener) {
      return this.getCurrentTabCustomNameMessageEventListener;
    }

    this.getCurrentTabCustomNameMessageEventListener = [
      new GetCurrentTabCustomNameMessageEventListener(TabRebrandDependencyProvider.getGetTabCustomNameUseCases())
    ];
    return this.getCurrentTabCustomNameMessageEventListener;
  }

  private static clearCurrentTabCustomNameMessageEventListener: [ClearCurrentTabCustomNameMessageEventListener];
  static getClearCurrentTabCustomNameMessageEventListener(): [ClearCurrentTabCustomNameMessageEventListener] {
    if (this.clearCurrentTabCustomNameMessageEventListener) {
      return this.clearCurrentTabCustomNameMessageEventListener;
    }

    this.clearCurrentTabCustomNameMessageEventListener = [
      new ClearCurrentTabCustomNameMessageEventListener(TabRebrandDependencyProvider.getClearTabCustomNameUseCases())
    ];
    return this.clearCurrentTabCustomNameMessageEventListener;
  }

  private static setCurrentTabCustomIconMessageEventListener: [SetCurrentTabCustomIconMessageEventListener];
  static getSetCurrentTabCustomIconMessageEventListener(): [SetCurrentTabCustomIconMessageEventListener] {
    if (this.setCurrentTabCustomIconMessageEventListener) {
      return this.setCurrentTabCustomIconMessageEventListener;
    }

    this.setCurrentTabCustomIconMessageEventListener = [
      new SetCurrentTabCustomIconMessageEventListener(TabRebrandDependencyProvider.getSetTabCustomIconUseCases())
    ];
    return this.setCurrentTabCustomIconMessageEventListener;
  }

  private static getCurrentTabCustomIconMessageEventListener: [GetCurrentTabCustomIconMessageEventListener];
  static getGetCurrentTabCustomIconMessageEventListener(): [GetCurrentTabCustomIconMessageEventListener] {
    if (this.getCurrentTabCustomIconMessageEventListener) {
      return this.getCurrentTabCustomIconMessageEventListener;
    }

    this.getCurrentTabCustomIconMessageEventListener = [
      new GetCurrentTabCustomIconMessageEventListener(TabRebrandDependencyProvider.getGetTabCustomIconUseCases())
    ];
    return this.getCurrentTabCustomIconMessageEventListener;
  }

  private static clearCurrentTabCustomIconMessageEventListener: [ClearCurrentTabCustomIconMessageEventListener];
  static getClearCurrentTabCustomIconMessageEventListener(): [ClearCurrentTabCustomIconMessageEventListener] {
    if (this.clearCurrentTabCustomIconMessageEventListener) {
      return this.clearCurrentTabCustomIconMessageEventListener;
    }

    this.clearCurrentTabCustomIconMessageEventListener = [
      new ClearCurrentTabCustomIconMessageEventListener(TabRebrandDependencyProvider.getClearTabCustomIconUseCases())
    ];
    return this.clearCurrentTabCustomIconMessageEventListener;
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

  private static clearTabCustomNameMessageEventSender: ClearTabCustomNameMessageEventSender;
  static getClearTabCustomNameMessageEventSender(): ClearTabCustomNameMessageEventSender {
    if (this.clearTabCustomNameMessageEventSender) {
      return this.clearTabCustomNameMessageEventSender;
    }

    this.clearTabCustomNameMessageEventSender = new ClearTabCustomNameMessageEventSender(
      TabRebrandDependencyProvider.getBrowserMessageService(),
      TabRebrandDependencyProvider.getClearCurrentTabCustomNameMessageEventListener());

    return this.clearTabCustomNameMessageEventSender;
  }

  private static setTabCustomIconMessageEventSender: SetTabCustomIconMessageEventSender;
  static getSetTabCustomIconMessageEventSender(): SetTabCustomIconMessageEventSender {
    if (this.setTabCustomIconMessageEventSender) {
      return this.setTabCustomIconMessageEventSender;
    }

    this.setTabCustomIconMessageEventSender = new SetTabCustomIconMessageEventSender(
      TabRebrandDependencyProvider.getBrowserMessageService(),
      TabRebrandDependencyProvider.getSetCurrentTabCustomIconMessageEventListener());

    return this.setTabCustomIconMessageEventSender;
  }

  private static getTabCustomIconMessageEventSender: GetTabCustomIconMessageEventSender;
  static getGetTabCustomIconMessageEventSender(): GetTabCustomIconMessageEventSender {
    if (this.getTabCustomIconMessageEventSender) {
      return this.getTabCustomIconMessageEventSender;
    }

    this.getTabCustomIconMessageEventSender = new GetTabCustomIconMessageEventSender(
      TabRebrandDependencyProvider.getBrowserMessageService(),
      TabRebrandDependencyProvider.getGetCurrentTabCustomIconMessageEventListener());

    return this.getTabCustomIconMessageEventSender;
  }

  private static clearTabCustomIconMessageEventSender: ClearTabCustomIconMessageEventSender;
  static getClearTabCustomIconMessageEventSender(): ClearTabCustomIconMessageEventSender {
    if (this.clearTabCustomIconMessageEventSender) {
      return this.clearTabCustomIconMessageEventSender;
    }

    this.clearTabCustomIconMessageEventSender = new ClearTabCustomIconMessageEventSender(
      TabRebrandDependencyProvider.getBrowserMessageService(),
      TabRebrandDependencyProvider.getClearCurrentTabCustomIconMessageEventListener());

    return this.clearTabCustomIconMessageEventSender;
  }
}