import type { WorkspaceTabGroup } from "../models/workspace-tab-group";

export interface WorkspaceTabGroupRepository {
  save(workspaceTabGroup: WorkspaceTabGroup): Promise<void>;
  get(id: string): Promise<WorkspaceTabGroup>;
  list(): Promise<WorkspaceTabGroup[]>;
  delete(id: string): Promise<void>;
}
