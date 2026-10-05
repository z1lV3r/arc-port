import { WorkspaceTabRepository } from "../domain/interfaces/workspace-tab-repository";
import { WorkspaceTab } from "../domain/models/workspace-tab";

export class ChromeStorageWorkspaceTabRepository implements WorkspaceTabRepository {
    private postfix: string;

    constructor(postfix: string = "-workspace-tab") {
        this.postfix = postfix;
    }

    async save(id: string, checkpointUrl: string): Promise<void> {
        await chrome.storage.local.set({ [id + this.postfix]: { checkpointUrl } });
    }

    async get(id: string): Promise<WorkspaceTab> {
        const storageKey = id + this.postfix;
        const result = await chrome.storage.local.get(storageKey);
        const data = result[storageKey];
        if (!data) {
            throw new Error(`WorkspaceTab with id ${id} not found`);
        }
        return new WorkspaceTab(id, data.checkpointUrl);
    }

    async list(): Promise<WorkspaceTab[]> {
        const result = await chrome.storage.local.get(null);
        return Object.keys(result)
            .filter(key => key.endsWith(this.postfix))
            .map(key => {
                const id = key.slice(0, -this.postfix.length);
                const data = result[key];
                return new WorkspaceTab(id, data.checkpointUrl);
            });
    }

    async delete(id: string): Promise<void> {
        await chrome.storage.local.remove(id + this.postfix);
    }

}
