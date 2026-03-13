import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { ResetCurrentTabToDefaultUrlMessageEventListener } from "./reset-tab-to-default-url-use-cases-listeners/reset-current-tab-to-default-url-message-event-listener";
import type { ResetOrCloseCurrentTabToDefaultUrlMessageEventListener } from "./reset-tab-to-default-url-use-cases-listeners/reset-or-close-current-tab-to-default-url-message-event-listener";

export class ResetTabToDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private resetCurrentTabToDefaultUrlMessageEventListener: ResetCurrentTabToDefaultUrlMessageEventListener;
  private resetOrCloseCurrentTabToDefaultUrlMessageEventListener: ResetOrCloseCurrentTabToDefaultUrlMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ResetCurrentTabToDefaultUrlMessageEventListener, ResetOrCloseCurrentTabToDefaultUrlMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.resetCurrentTabToDefaultUrlMessageEventListener, this.resetOrCloseCurrentTabToDefaultUrlMessageEventListener] = listeners;
  }

  async sendResetCurrentTabToDefaultUrlEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.resetCurrentTabToDefaultUrlMessageEventListener.name, {});
  }

  async sendResetOrCloseCurrentTabToDefaultUrlEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.resetOrCloseCurrentTabToDefaultUrlMessageEventListener.name, {});
  }

}
