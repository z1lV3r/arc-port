import { WorkspaceTabGroupRepository } from "../domain/interfaces/workspace-tab-group-repository";
import { WorkspaceTabGroup, type WorkspaceTabGroupType } from "../domain/models/workspace-tab-group";

export class ChromeStorageWorkspaceTabGroupRepository implements WorkspaceTabGroupRepository {
    private postfix: string;

    constructor(postfix: string = "-workspace-tab-group") {
        this.postfix = postfix;
    }

    async save(workspaceTabGroup: WorkspaceTabGroup): Promise<void> {
        await chrome.storage.local.set({ [workspaceTabGroup.id + this.postfix]: { title: workspaceTabGroup.title, color: workspaceTabGroup.color, type: workspaceTabGroup.type } });
    }

    async get(id: string): Promise<WorkspaceTabGroup> {
        const storageKey = id + this.postfix;
        const result = await chrome.storage.local.get(storageKey);
        const data = result[storageKey];
        if (!data) {
            throw new Error(`WorkspaceTabGroup with id ${id} not found`);
        }
        return new WorkspaceTabGroup(id, data.title, data.color, data.type as WorkspaceTabGroupType);
    }

    async list(): Promise<WorkspaceTabGroup[]> {
        const result = await chrome.storage.local.get(null);
        return Object.keys(result)
            .filter(key => key.endsWith(this.postfix))
            .map(key => {
                const id = key.slice(0, -this.postfix.length);
                const data = result[key];
                return new WorkspaceTabGroup(id, data.title, data.color, data.type as WorkspaceTabGroupType);
            });
    }

    async delete(id: string): Promise<void> {
        await chrome.storage.local.remove(id + this.postfix);
    }

}
