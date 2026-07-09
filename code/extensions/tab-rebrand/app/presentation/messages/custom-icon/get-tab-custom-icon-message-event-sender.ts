import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { GetCurrentTabCustomIconMessageEventListener } from "./get-current-tab-custom-icon-message-event-listener.ts";

export class GetTabCustomIconMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private getCurrentTabCustomIconMessageEventListener: GetCurrentTabCustomIconMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetCurrentTabCustomIconMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getCurrentTabCustomIconMessageEventListener] = listeners;
  }

  async sendGetCurrentTabCustomIconEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.getCurrentTabCustomIconMessageEventListener.name,
      {},
    );
    return response?.data ?? "";
  }
}
