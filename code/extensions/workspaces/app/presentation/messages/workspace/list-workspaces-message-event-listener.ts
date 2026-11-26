import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { GetWorkspaceUseCases } from "../../../use-cases/get-workspace-use-cases";

export class ListWorkspacesMessageEventListener implements MessageEventListener {
  private readonly getWorkspaceUseCases: GetWorkspaceUseCases;

  constructor(getWorkspaceUseCases: GetWorkspaceUseCases) {
    this.getWorkspaceUseCases = getWorkspaceUseCases;
  }

  name = "list-workspaces-message-event-listener";
  description = "List workspaces";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    console.log("List workspaces message event listener");
    const workspaces = await this.getWorkspaceUseCases.listWorkspaces();
    console.log("Workspaces:", workspaces);
    sendResponse({ success: true, data: workspaces });
  }
}
