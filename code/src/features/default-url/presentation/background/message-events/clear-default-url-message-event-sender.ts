import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabDefaultUrlMessageEventListener } from "./clear-default-url-use-cases-listeners/clear-current-tab-default-url-message-event-listener";
import type { ClearTabDefaultUrlMessageEventListener } from "./clear-default-url-use-cases-listeners/clear-tab-default-url-message-event-listener";

export class ClearDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private clearCurrentTabDefaultUrlMessageEventListener: ClearCurrentTabDefaultUrlMessageEventListener;
  private clearTabDefaultUrlMessageEventListener: ClearTabDefaultUrlMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ClearCurrentTabDefaultUrlMessageEventListener, ClearTabDefaultUrlMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.clearCurrentTabDefaultUrlMessageEventListener, this.clearTabDefaultUrlMessageEventListener] = listeners;
  }

  async sendClearCurrentTabDefaultUrlEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.clearCurrentTabDefaultUrlMessageEventListener.name, {});
  }

  async sendClearTabDefaultUrlEventMessage(tabId: string): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.clearTabDefaultUrlMessageEventListener.name, { tabId });
  }

}


