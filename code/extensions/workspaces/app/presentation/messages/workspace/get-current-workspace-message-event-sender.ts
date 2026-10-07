import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { GetCurrentWorkspaceMessageEventListener } from "./get-current-workspace-message-event-listener";

export class GetCurrentWorkspaceMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private getCurrentWorkspaceMessageEventListener: GetCurrentWorkspaceMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetCurrentWorkspaceMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getCurrentWorkspaceMessageEventListener] = listeners;
  }

  async sendGetCurrentWorkspaceEventMessage(): Promise<any> {
    const response = await this.browserMessageService.sendEventMessage(
      this.getCurrentWorkspaceMessageEventListener.name,
      {},
    );
    return response?.data;
  }
}
