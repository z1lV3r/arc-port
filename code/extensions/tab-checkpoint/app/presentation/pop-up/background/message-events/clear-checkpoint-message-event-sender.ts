import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabCheckpointMessageEventListener } from "./clear-checkpoint-use-cases-listeners/clear-current-tab-checkpoint-message-event-listener.ts";
import type { ClearTabCheckpointMessageEventListener } from "./clear-checkpoint-use-cases-listeners/clear-tab-checkpoint-message-event-listener.ts";

export class ClearCheckpointMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private clearCurrentTabCheckpointMessageEventListener: ClearCurrentTabCheckpointMessageEventListener;
  private clearTabCheckpointMessageEventListener: ClearTabCheckpointMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [
      ClearCurrentTabCheckpointMessageEventListener,
      ClearTabCheckpointMessageEventListener,
    ],
  ) {
    this.browserMessageService = browserMessageService;
    [
      this.clearCurrentTabCheckpointMessageEventListener,
      this.clearTabCheckpointMessageEventListener,
    ] = listeners;
  }

  async sendClearCurrentTabCheckpointEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.clearCurrentTabCheckpointMessageEventListener.name,
      {},
    );
  }

  async sendClearTabCheckpointEventMessage(tabId: string): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.clearTabCheckpointMessageEventListener.name,
      { tabId },
    );
  }
}
