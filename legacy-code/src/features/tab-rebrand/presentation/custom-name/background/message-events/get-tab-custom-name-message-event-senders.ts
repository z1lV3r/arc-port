import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { GetCurrentTabCustomNameMessageEventListener } from "./get-custom-name-use-cases-listeners/get-current-tab-custom-name-message-event-listener";

export class GetTabCustomNameMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private getCurrentTabCustomNameMessageEventListener: GetCurrentTabCustomNameMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetCurrentTabCustomNameMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getCurrentTabCustomNameMessageEventListener] = listeners;
  }

  async sendGetCurrentTabCustomNameEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(this.getCurrentTabCustomNameMessageEventListener.name, {});
    return response?.data ?? "";
  }
}