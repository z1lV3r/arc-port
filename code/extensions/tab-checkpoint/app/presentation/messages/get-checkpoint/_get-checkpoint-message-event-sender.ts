import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { GetCurrentTabCheckpointMessageEventListener } from "./presentation/background/message-events/get-checkpoint-use-cases-listeners/get-current-tab-checkpoint-message-event-listener.js";

export class GetCheckpointMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private getCurrentTabCheckpointMessageEventListener: GetCurrentTabCheckpointMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetCurrentTabCheckpointMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getCurrentTabCheckpointMessageEventListener] = listeners;
  }

  async sendGetCurrentTabCheckpointEventMessage(): Promise<string> {
    const response = await this.browserMessageService.sendEventMessage(
      this.getCurrentTabCheckpointMessageEventListener.name,
      {},
    );
    return response?.data ?? "";
  }
}
