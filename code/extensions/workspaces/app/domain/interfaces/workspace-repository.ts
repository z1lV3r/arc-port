import type { Workspace } from "../models/workspace";
import type { WorkspaceTabGroup } from "../models/workspace-tab-group";

export interface WorkspaceRepository {
  save(id: string, name: string, iconUrl: string, color: string, workspaceTabGroups?: WorkspaceTabGroup[]): Promise<void>;
  get(id: string): Promise<Workspace>;
  list(): Promise<Workspace[]>;
  delete(id: string): Promise<void>;
}
