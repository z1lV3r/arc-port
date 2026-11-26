import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { ActivateWorkspaceUseCases } from "../../../use-cases/activate-workspace-use-cases";

export class ActivateWorkspaceMessageEventListener implements MessageEventListener {
  private readonly activateWorkspaceUseCases: ActivateWorkspaceUseCases;

  constructor(activateWorkspaceUseCases: ActivateWorkspaceUseCases) {
    this.activateWorkspaceUseCases = activateWorkspaceUseCases;
  }

  name = "activate-workspace-message-event-listener";
  description = "Activate workspace";

  async command(request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const { id } = request;
    await this.activateWorkspaceUseCases.activateWorkspace(id);
    sendResponse({ success: true, data: null });
  }
}
