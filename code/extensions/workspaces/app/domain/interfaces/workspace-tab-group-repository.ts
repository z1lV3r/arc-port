import type { WorkspaceTabGroup } from "../models/workspace-tab-group";

export interface WorkspaceTabGroupRepository {
  save(id: string, title: string, color: string, workspaceTabOrder: string[], type: string): Promise<void>;
  get(id: string): Promise<WorkspaceTabGroup>;
  list(): Promise<WorkspaceTabGroup[]>;
  delete(id: string): Promise<void>;
}
