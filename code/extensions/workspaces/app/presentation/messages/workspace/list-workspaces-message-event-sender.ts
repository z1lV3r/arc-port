import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { ListWorkspacesMessageEventListener } from "./list-workspaces-message-event-listener";

export class ListWorkspacesMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private listWorkspacesMessageEventListener: ListWorkspacesMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [ListWorkspacesMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.listWorkspacesMessageEventListener] = listeners;
  }

  async sendListWorkspacesEventMessage(): Promise<any> {
    const response = await this.browserMessageService.sendEventMessage(
      this.listWorkspacesMessageEventListener.name,
      {},
    );
    return response?.data ?? [];
  }
}
