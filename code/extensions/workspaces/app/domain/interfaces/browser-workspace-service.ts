import { Workspace } from "../models/workspace";

export interface BrowserWorkspaceService {
  createWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void>;
  getCurrentWorkspaceId(): Promise<string>;
  getWorkspace(id: string): Promise<Workspace>;
  listWorkspaces(): Promise<Workspace[]>;
  updateWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void>;
  deleteWorkspace(id: string): Promise<void>;
}
