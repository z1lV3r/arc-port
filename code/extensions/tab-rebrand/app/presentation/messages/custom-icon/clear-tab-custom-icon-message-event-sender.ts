import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabCustomIconMessageEventListener } from "./clear-current-tab-custom-icon-message-event-listener.ts";

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
    await this.browserMessageService.sendEventMessage(
      this.clearCurrentTabCustomIconMessageEventListener.name,
      {},
    );
  }
}
