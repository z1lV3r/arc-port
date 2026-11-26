export type WorkspaceTabType = "std" | "ws" | "pin";

export class WorkspaceTab {
  public id: string;
  public checkpointUrl: string;
  public iconUrl?: string;
  public tabGroupId?: string;
  public type: WorkspaceTabType;

  constructor(
    id: string,
    checkpointUrl: string,
    type: WorkspaceTabType = "std",
    iconUrl?: string,
    tabGroupId?: string,
  ) {
    this.id = id;
    this.checkpointUrl = checkpointUrl;
    this.type = type;
    this.iconUrl = iconUrl;
    this.tabGroupId = tabGroupId;
  }
}