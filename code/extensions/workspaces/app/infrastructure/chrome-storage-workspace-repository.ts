import { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";
import { WorkspaceWindow } from "../domain/models/workspace-window";

export class ChromeStorageWorkspaceRepository implements WorkspaceWindowRepository {
    private postfix: string;

    constructor(postfix: string = "-workspace") {
        this.postfix = postfix;
    }

    async save(workspace: WorkspaceWindow): Promise<void> {
        await chrome.storage.local.set({ [workspace.id + this.postfix]: workspace });
    }

    async get(id: string): Promise<WorkspaceWindow> {
        const storageKey = id + this.postfix;
        const result = await chrome.storage.local.get(storageKey);
        const data = result[storageKey];
        if (!data) {
            throw new Error(`Workspace with id ${id} not found`);
        }
        return new WorkspaceWindow(id, data.workspaceTabOrder || []);
    }

    async list(): Promise<WorkspaceWindow[]> {
        const result = await chrome.storage.local.get(null);
        return Object.keys(result)
            .filter(key => key.endsWith(this.postfix))
            .map(key => {
                const id = key.slice(0, -this.postfix.length);
                const data = result[key];
                return new WorkspaceWindow(id, data.workspaceTabOrder || []);
            });
    }

    async delete(id: string): Promise<void> {
        await chrome.storage.local.remove(id + this.postfix);
    }

}
