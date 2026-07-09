import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { SetCurrentTabCustomNameMessageEventListener } from "./set-current-tab-custom-name-message-event-listener.ts";

export class SetTabCustomNameMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private setCurrentTabCustomNameMessageEventListener: SetCurrentTabCustomNameMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [SetCurrentTabCustomNameMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.setCurrentTabCustomNameMessageEventListener] = listeners;
  }

  async sendSetCurrentTabCustomNameEventMessage(name: string): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.setCurrentTabCustomNameMessageEventListener.name,
      { name },
    );
    return response?.data ?? "";
  }
}
