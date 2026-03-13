import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { GetCurrentTabDefaultUrlMessageEventListener } from "./get-default-url-use-cases-listeners/get-current-tab-default-url-message-event-listener";

export class GetDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private getCurrentTabDefaultUrlMessageEventListener: GetCurrentTabDefaultUrlMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetCurrentTabDefaultUrlMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getCurrentTabDefaultUrlMessageEventListener] = listeners;
  }

  async sendGetCurrentTabDefaultUrlEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(this.getCurrentTabDefaultUrlMessageEventListener.name, {});
    return response?.data ?? "";
  }

}
