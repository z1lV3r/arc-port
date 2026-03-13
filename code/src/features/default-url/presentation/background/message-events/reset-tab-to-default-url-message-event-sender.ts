import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { ResetCurrentTabToDefaultUrlMessageEventListener } from "./reset-tab-to-default-url-use-cases-listeners/reset-current-tab-to-default-url-message-event-listener";

export class ResetTabToDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private resetCurrentTabToDefaultUrlMessageEventListener: ResetCurrentTabToDefaultUrlMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ResetCurrentTabToDefaultUrlMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.resetCurrentTabToDefaultUrlMessageEventListener] = listeners;
  }

  async sendResetCurrentTabToDefaultUrlEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.resetCurrentTabToDefaultUrlMessageEventListener.name, {});
  }

}
