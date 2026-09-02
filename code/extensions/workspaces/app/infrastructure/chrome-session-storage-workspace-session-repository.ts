import type { WorkspaceSession } from "../domain/models/workspace-session";
import type { WorkspaceSessionRepository } from "../domain/interfaces/workspace-session-repository";

export class ChromeSessionStorageWorkspaceSessionRepository implements WorkspaceSessionRepository {

  private postfix: string;
    
    constructor(postfix: string = "-workspaceSession") {
        this.postfix = postfix;
    }
 
  async create(workspaceSession: WorkspaceSession): Promise<void> {
    const key = `${workspaceSession.workspaceId}${this.postfix}`;
    await chrome.storage.session.set({ [key]: workspaceSession });
  }

  async get(workspaceId: string): Promise<WorkspaceSession> {
    const key = `${workspaceId}${this.postfix}`;
    const result = await chrome.storage.session.get(key);
    return result[key];
  }

  async update(workspaceId: string, workspaceSession: WorkspaceSession): Promise<void> {
    const key = `${workspaceId}${this.postfix}`;
    await chrome.storage.session.set({ [key]: workspaceSession });
  }

  async delete(workspaceId: string): Promise<void> {
    const key = `${workspaceId}${this.postfix}`;
    await chrome.storage.session.remove(key);
  }
}