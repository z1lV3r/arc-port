import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { GetWorkspaceUseCases } from "../../../use-cases/get-workspace-use-cases";

export class GetCurrentWorkspaceMessageEventListener implements MessageEventListener {
  private readonly getWorkspaceUseCases: GetWorkspaceUseCases;

  constructor(getWorkspaceUseCases: GetWorkspaceUseCases) {
    this.getWorkspaceUseCases = getWorkspaceUseCases;
  }

  name = "get-current-workspace-message-event-listener";
  description = "Get current workspace";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const workspace = await this.getWorkspaceUseCases.getCurrentWorkspace();
    sendResponse({ success: true, data: workspace });
  }
}
