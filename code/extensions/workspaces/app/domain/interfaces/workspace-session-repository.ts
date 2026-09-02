import type { WorkspaceSession } from "../models/workspace-session";

export interface WorkspaceSessionRepository {
  create(workspaceSession: WorkspaceSession): Promise<void>;
  get(workspaceId: string): Promise<WorkspaceSession>;
  update(workspaceId: string, workspaceSession: WorkspaceSession): Promise<void>;
  delete(workspaceId: string): Promise<void>;
}