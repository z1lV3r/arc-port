import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ReorderWorkspaceMessageEventListener } from "./reorder-workspace-message-event-listener";

export class ReorderWorkspaceMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private reorderWorkspaceMessageEventListener: ReorderWorkspaceMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ReorderWorkspaceMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.reorderWorkspaceMessageEventListener] = listeners;
  }

  async sendReorderWorkspaceEventMessage(ids: string[]): Promise<void> {
    await this.browserMessageService.sendEventMessage(
      this.reorderWorkspaceMessageEventListener.name,
      { ids },
    );
  }
}
