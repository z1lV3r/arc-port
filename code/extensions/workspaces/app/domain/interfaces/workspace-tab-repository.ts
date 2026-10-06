import type { WorkspaceTab } from "../models/workspace-tab";

export interface WorkspaceTabRepository {
  save(tab: WorkspaceTab): Promise<void>;
  get(id: string): Promise<WorkspaceTab>;
  list(): Promise<WorkspaceTab[]>;
  delete(id: string): Promise<void>;
}
