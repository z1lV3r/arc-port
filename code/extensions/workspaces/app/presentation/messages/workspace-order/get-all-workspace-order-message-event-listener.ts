import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { OrderWorkspaceUseCases } from "../../../use-cases/order-workspace-use-cases";

export class GetAllWorkspaceOrderMessageEventListener implements MessageEventListener {
  private readonly orderWorkspaceUseCases: OrderWorkspaceUseCases;

  constructor(orderWorkspaceUseCases: OrderWorkspaceUseCases) {
    this.orderWorkspaceUseCases = orderWorkspaceUseCases;
  }

  name = "get-all-workspace-order-message-event-listener";
  description = "Get all workspace order";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const order = await this.orderWorkspaceUseCases.getAll();
    sendResponse({ success: true, data: order });
  }
}
