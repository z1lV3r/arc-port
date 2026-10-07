import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { GetAllWorkspaceOrderMessageEventListener } from "./get-all-workspace-order-message-event-listener";

export class GetAllWorkspaceOrderMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private getAllWorkspaceOrderMessageEventListener: GetAllWorkspaceOrderMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    listeners: [GetAllWorkspaceOrderMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    [this.getAllWorkspaceOrderMessageEventListener] = listeners;
  }

  async sendGetAllWorkspaceOrderEventMessage(): Promise<any> {
    const response = await this.browserMessageService.sendEventMessage(
      this.getAllWorkspaceOrderMessageEventListener.name,
      {},
    );
    return response?.data ?? [];
  }
}
