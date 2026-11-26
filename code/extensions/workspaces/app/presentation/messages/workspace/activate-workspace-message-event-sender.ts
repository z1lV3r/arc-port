import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ActivateWorkspaceMessageEventListener } from "./activate-workspace-message-event-listener";

export class ActivateWorkspaceMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private activateWorkspaceMessageEventListener: ActivateWorkspaceMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ActivateWorkspaceMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.activateWorkspaceMessageEventListener] = listeners;
  }

  async sendActivateWorkspaceEventMessage(id: string): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.activateWorkspaceMessageEventListener.name,
      { id },
    );
  }
}
