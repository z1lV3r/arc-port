import type { Workspace } from "../models/workspace";

export interface WorkspaceRepository {
  save(id: string, name: string, iconUrl: string, color: string, workspaceTabGroupOrder: string[]): Promise<void>;
  get(id: string): Promise<Workspace>;
  list(): Promise<Workspace[]>;
  delete(id: string): Promise<void>;
}
