import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { CreateWorkspaceMessageEventListener } from "./create-workspace-message-event-listener";

export class CreateWorkspaceMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private createWorkspaceMessageEventListener: CreateWorkspaceMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [CreateWorkspaceMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.createWorkspaceMessageEventListener] = listeners;
  }

  async sendCreateWorkspaceEventMessage(name: string, iconUrl: string, color: string): Promise<any> {
    const response = await this.browserMessageService.sendEventMessage(
      this.createWorkspaceMessageEventListener.name,
      { name, iconUrl, color },
    );
    return response?.data;
  }
}
