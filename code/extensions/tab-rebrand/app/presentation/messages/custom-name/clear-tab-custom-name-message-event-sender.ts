import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabCustomNameMessageEventListener } from "./clear-current-tab-custom-name-message-event-listener.ts";

export class ClearTabCustomNameMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private clearCurrentTabCustomNameMessageEventListener: ClearCurrentTabCustomNameMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ClearCurrentTabCustomNameMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.clearCurrentTabCustomNameMessageEventListener] = listeners;
  }

  async sendClearCurrentTabCustomNameEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.clearCurrentTabCustomNameMessageEventListener.name,
      {},
    );
  }
}
