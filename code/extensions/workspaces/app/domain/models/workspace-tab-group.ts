import type { WorkspaceTab } from "./workspace-tab";

export type WorkspaceTabGroupType = "std" | "ws" | "pin";

export class WorkspaceTabGroup {
  public id: string;
  public title: string;
  public color: string;
  public type: WorkspaceTabGroupType;
  public workspaceTabOrder: string[];
  
  constructor(
    id: string,
    title: string,
    color: string,
    workspaceTabOrder: string[],
    type: WorkspaceTabGroupType = "std",
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.workspaceTabOrder = workspaceTabOrder;
    this.type = type;
  }
}