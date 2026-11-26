import { WorkspaceTabGroup } from "./workspace-tab-group";

export class WorkspaceWindow {
  constructor(
    public readonly id: string,
    public workspaceTabOrder: string[],
  ) { }
}