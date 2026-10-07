import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { CreateWorkspaceUseCases } from "../../../use-cases/create-workspace-use-cases";

export class CreateWorkspaceMessageEventListener implements MessageEventListener {
  private readonly createWorkspaceUseCases: CreateWorkspaceUseCases;

  constructor(createWorkspaceUseCases: CreateWorkspaceUseCases) {
    this.createWorkspaceUseCases = createWorkspaceUseCases;
  }

  name = "create-workspace-message-event-listener";
  description = "Create workspace";

  async command(request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const { name, iconUrl, color } = request;
    const workspace = await this.createWorkspaceUseCases.createWorkspace(name, iconUrl, color);
    sendResponse({ success: true, data: workspace });
  }
}
