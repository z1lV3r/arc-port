import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { SetCurrentTabDefaultUrlMessageEventListener } from "./set-default-url-use-cases-listeners/set-current-tab-default-url-message-event-listener";

export class SetDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private setCurrentTabDefaultUrlMessageEventListener: SetCurrentTabDefaultUrlMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [SetCurrentTabDefaultUrlMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.setCurrentTabDefaultUrlMessageEventListener] = listeners;
  }

  async sendSetCurrentTabDefaultUrlEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(this.setCurrentTabDefaultUrlMessageEventListener.name, {});
    return response?.data ?? "";
  }

}
