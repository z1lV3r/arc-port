import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { SetCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-current-tab-checkpoint-message-event-listener.js";
import type { SetTabCheckpointIfUnsetMessageEventListener } from "./presentation/background/message-events/set-checkpoint-use-cases-listeners/set-tab-checkpoint-if-unset-message-event-listener.js";

export class SetCheckpointMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private setCurrentTabCheckpointMessageEventListener: SetCurrentTabCheckpointMessageEventListener;
  private setTabCheckpointIfUnsetMessageEventListener: SetTabCheckpointIfUnsetMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [
      SetCurrentTabCheckpointMessageEventListener,
      SetTabCheckpointIfUnsetMessageEventListener,
    ],
  ) {
    this.browserMessageService = browserMessageService;
    [
      this.setCurrentTabCheckpointMessageEventListener,
      this.setTabCheckpointIfUnsetMessageEventListener,
    ] = listeners;
  }

  async sendSetCurrentTabCheckpointEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.setCurrentTabCheckpointMessageEventListener.name,
      {},
    );
    return response?.data ?? "";
  }

  async sendSetTabCheckpointIfUnsetEventMessage(
    tabId: number,
  ): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.setTabCheckpointIfUnsetMessageEventListener.name,
      { tabId },
    );
    return response?.data ?? "";
  }
}
