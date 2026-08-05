import type { Workspace } from "../models/workspace";

export interface WorkspaceRepository {
  create(id: string, name: string, iconUrl: string, color:string): Promise<void>;
  get(id: string): Promise<Workspace>;
  list(): Promise<Workspace[]>;
  update(id: string, name: string, iconUrl: string, color:string): Promise<void>;
  delete(id: string): Promise<void>;
}
