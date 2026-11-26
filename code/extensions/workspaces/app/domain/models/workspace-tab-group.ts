import type { WorkspaceTab } from "./workspace-tab";

export type WorkspaceTabGroupType = "std" | "ws";

export class WorkspaceTabGroup {
  public id: string;
  public title: string;
  public color: string;
  public type: WorkspaceTabGroupType;
  
  constructor(
    id: string,
    title: string,
    color: string,
    type: WorkspaceTabGroupType = "std",
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.type = type;
  }
}