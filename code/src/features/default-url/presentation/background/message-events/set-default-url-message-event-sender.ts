import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { SetCurrentTabDefaultUrlMessageEventListener } from "./set-default-url-use-cases-listeners/set-current-tab-default-url-message-event-listener";
import type { SetTabDefaultUrlIfUnsetMessageEventListener } from "./set-default-url-use-cases-listeners/set-tab-default-url-if-unset-message-event-listener";

export class SetDefaultUrlMessageEventSender {

  private browserMessageService: BrowserMessageService;
  private setCurrentTabDefaultUrlMessageEventListener: SetCurrentTabDefaultUrlMessageEventListener;
  private setTabDefaultUrlIfUnsetMessageEventListener: SetTabDefaultUrlIfUnsetMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [SetCurrentTabDefaultUrlMessageEventListener, SetTabDefaultUrlIfUnsetMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.setCurrentTabDefaultUrlMessageEventListener, this.setTabDefaultUrlIfUnsetMessageEventListener] = listeners;
  }

  async sendSetCurrentTabDefaultUrlEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(this.setCurrentTabDefaultUrlMessageEventListener.name, {});
    return response?.data ?? "";
  }

  async sendSetTabDefaultUrlIfUnsetMessageMessage(tabId: number): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(this.setTabDefaultUrlIfUnsetMessageEventListener.name, { tabId });
    return response?.data ?? "";
  }

}
