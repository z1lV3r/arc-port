import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { SetCurrentTabCustomIconMessageEventListener } from "./set-current-tab-custom-icon-message-event-listener.ts";

export class SetTabCustomIconMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private setCurrentTabCustomIconMessageEventListener: SetCurrentTabCustomIconMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [SetCurrentTabCustomIconMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.setCurrentTabCustomIconMessageEventListener] = listeners;
  }

  async sendSetCurrentTabCustomIconEventMessage(iconUrl: string): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.setCurrentTabCustomIconMessageEventListener.name,
      { iconUrl },
    );
    return response?.data ?? "";
  }
}
