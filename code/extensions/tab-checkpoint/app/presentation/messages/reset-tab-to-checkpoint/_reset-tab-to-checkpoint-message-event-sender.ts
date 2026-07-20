import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";

import type { ResetCurrentTabToCheckpointMessageEventListener } from "./reset-current-tab-to-checkpoint-message-event-listener.js";
import type { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./reset-or-close-current-tab-to-checkpoint-message-event-listener.js";

export class ResetTabToCheckpointMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private resetCurrentTabToCheckpointMessageEventListener: ResetCurrentTabToCheckpointMessageEventListener;
  private resetOrCloseCurrentTabToCheckpointMessageEventListener: ResetOrCloseCurrentTabToCheckpointMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [
      ResetCurrentTabToCheckpointMessageEventListener,
      ResetOrCloseCurrentTabToCheckpointMessageEventListener,
    ],
  ) {
    this.browserMessageService = browserMessageService;
    [
      this.resetCurrentTabToCheckpointMessageEventListener,
      this.resetOrCloseCurrentTabToCheckpointMessageEventListener,
    ] = listeners;
  }

  async sendResetCurrentTabToCheckpointEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.resetCurrentTabToCheckpointMessageEventListener.name,
      {},
    );
  }

  async sendResetOrCloseCurrentTabToCheckpointEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.resetOrCloseCurrentTabToCheckpointMessageEventListener.name,
      {},
    );
  }
}
