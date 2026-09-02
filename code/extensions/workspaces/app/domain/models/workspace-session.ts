export class WorkspaceSession {
  constructor(
    public workspaceId: string,
    public windowId: number,
    public tabGroupId: number,
    public pinnedTabId: string,
  ) { }
}