import type { WorkspaceTab } from "./workspace-tab";

export type WorkspaceTabGroupType = "std" | "ws" | "pin";

export class WorkspaceTabGroup {
  public id: string;
  public title: string;
  public color: string;
  public type: WorkspaceTabGroupType;
  public workspaceTabs: WorkspaceTab[];
  
  constructor(
    id: string,
    title: string,
    color: string,
    workspaceTabs: WorkspaceTab[],
    type: WorkspaceTabGroupType = "std",
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.workspaceTabs = workspaceTabs;
    this.type = type;
  }
}