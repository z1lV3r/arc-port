import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { Workspace } from "../domain/models/workspace";

export class ChromeStorageWorkspaceRepository implements WorkspaceRepository {
    private postfix: string;

    constructor(postfix: string = "-workspace") {
        this.postfix = postfix;
    }

    async save(id: string, name: string, iconUrl: string, color: string, workspaceTabGroupOrder: string[]): Promise<void> {
        await chrome.storage.local.set({ [id + this.postfix]: { name, iconUrl, color, workspaceTabGroupOrder } });
    }

    async get(id: string): Promise<Workspace> {
        const storageKey = id + this.postfix;
        const result = await chrome.storage.local.get(storageKey);
        const data = result[storageKey];
        if (!data) {
            throw new Error(`Workspace with id ${id} not found`);
        }
        return new Workspace(id, data.name, data.iconUrl, data.color, data.workspaceTabGroupOrder);
    }

    async list(): Promise<Workspace[]> {
        const result = await chrome.storage.local.get(null);
        return Object.keys(result)
            .filter(key => key.endsWith(this.postfix))
            .map(key => {
                const id = key.slice(0, -this.postfix.length);
                const data = result[key];
                return new Workspace(id, data.name, data.iconUrl, data.color, data.workspaceTabGroupOrder);
            });
    }

    async delete(id: string): Promise<void> {
        await chrome.storage.local.remove(id + this.postfix);
    }

}
