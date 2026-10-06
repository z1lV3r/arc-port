import type { WorkspaceWindow } from "../models/workspace-window";

export interface WorkspaceWindowRepository {
  save(workspaceWindow: WorkspaceWindow): Promise<void>;
  get(id: string): Promise<WorkspaceWindow>;
  list(): Promise<WorkspaceWindow[]>;
  delete(id: string): Promise<void>;
}
