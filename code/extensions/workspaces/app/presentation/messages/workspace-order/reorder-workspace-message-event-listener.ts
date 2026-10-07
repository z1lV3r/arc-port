import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { OrderWorkspaceUseCases } from "../../../use-cases/order-workspace-use-cases";

export class ReorderWorkspaceMessageEventListener implements MessageEventListener {
  private readonly orderWorkspaceUseCases: OrderWorkspaceUseCases;

  constructor(orderWorkspaceUseCases: OrderWorkspaceUseCases) {
    this.orderWorkspaceUseCases = orderWorkspaceUseCases;
  }

  name = "reorder-workspace-message-event-listener";
  description = "Reorder workspaces";

  async command(request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const { ids } = request;
    await this.orderWorkspaceUseCases.reorder(ids);
    sendResponse({ success: true, data: null });
  }
}
