import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabCustomIconMessageEventListener } from "./clear-icon-use-cases-listeners/clear-current-tab-custom-icon-message-event-listener";

export class ClearTabCustomIconMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private clearCurrentTabCustomIconMessageEventListener: ClearCurrentTabCustomIconMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ClearCurrentTabCustomIconMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.clearCurrentTabCustomIconMessageEventListener] = listeners;
  }

  async sendClearCurrentTabCustomIconEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.clearCurrentTabCustomIconMessageEventListener.name, {});
  }
}