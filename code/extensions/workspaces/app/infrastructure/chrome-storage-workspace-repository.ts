import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { Workspace } from "../domain/models/workspace";

export class ChromeStorageWorkspaceRepository implements WorkspaceRepository {
    private postfix: string;
    
    constructor(postfix: string = "-workspace") {
        this.postfix = postfix;
    }
    
    async create(id: string, name: string, iconUrl: string, color: string): Promise<void> {
        await chrome.storage.local.set({ [id + this.postfix]: { name, iconUrl, color } });
    }
    
    async get(id: string): Promise<Workspace> {
        throw new Error("Method not implemented.");
    }
    
    list(): Promise<Workspace[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, name: string, iconUrl: string, color: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}
