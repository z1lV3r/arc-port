import { WorkspaceTabGroup } from "./workspace-tab-group";

export class Workspace {
  constructor(
    public readonly id: string,
    public name: string,
    public iconUrl: string,
    public color: string,
    public workspaceTabGroups: WorkspaceTabGroup[],
  ) {}
}