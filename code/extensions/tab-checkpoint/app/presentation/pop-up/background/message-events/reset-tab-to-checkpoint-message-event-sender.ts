import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ResetCurrentTabToCheckpointMessageEventListener } from "./reset-tab-to-checkpoint-use-cases-listeners/reset-current-tab-to-checkpoint-message-event-listener.ts";
import type { ResetOrCloseCurrentTabToCheckpointMessageEventListener } from "./reset-tab-to-checkpoint-use-cases-listeners/reset-or-close-current-tab-to-checkpoint-message-event-listener.ts";

export class ResetTabToCheckpointMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private resetCurrentTabToCheckpointMessageEventListener: ResetCurrentTabToCheckpointMessageEventListener;
  private resetOrCloseCurrentTabToCheckpointMessageEventListener: ResetOrCloseCurrentTabToCheckpointMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ResetCurrentTabToCheckpointMessageEventListener, ResetOrCloseCurrentTabToCheckpointMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.resetCurrentTabToCheckpointMessageEventListener, this.resetOrCloseCurrentTabToCheckpointMessageEventListener] = listeners;
  }

  async sendResetCurrentTabToCheckpointEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.resetCurrentTabToCheckpointMessageEventListener.name, {});
  }

  async sendResetOrCloseCurrentTabToCheckpointEventMessage(): Promise<void> {
    await this.browserMessageService.sendEventMessage(this.resetOrCloseCurrentTabToCheckpointMessageEventListener.name, {});
  }
}
