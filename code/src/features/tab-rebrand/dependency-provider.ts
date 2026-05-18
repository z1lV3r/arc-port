import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import { ChromeMessageService } from "@/shared/infrastructure/chrome-message-service"
import { SetTabCustomNameMessageEventSender } from "./presentation/background/message-events/set-custom-name-message-event-senders";
import { SetCurrentTabCustomNameMessageEventListener } from "./presentation/background/message-events/set-custom-name-use-cases-listeners/set-current-tab-custom-name-message-event-listener";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";

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
        new SetCurrentTabCustomNameMessageEventListener()
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