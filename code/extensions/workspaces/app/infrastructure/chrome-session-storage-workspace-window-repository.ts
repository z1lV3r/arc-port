import type { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";

export class ChromeSessionStorageWorkspaceWindowRepository implements WorkspaceWindowRepository {
    private readonly POSTFIX = "_workspace_window";
    private readonly REVERSE_POSTFIX = "_window_workspace";

    async save(workspaceId: string, windowId: number): Promise<void> {
        const key = workspaceId + this.POSTFIX;
        const reverseKey = windowId.toString() + this.REVERSE_POSTFIX;
        await chrome.storage.session.set({ 
            [key]: windowId,
            [reverseKey]: workspaceId
        });
    }

    async get(workspaceId: string): Promise<number | undefined> {
        const key = workspaceId + this.POSTFIX;
        const result = await chrome.storage.session.get(key);
        return result[key];
    }

    async getByWindowId(windowId: number): Promise<string | undefined> {
        const reverseKey = windowId.toString() + this.REVERSE_POSTFIX;
        const result = await chrome.storage.session.get(reverseKey);
        return result[reverseKey];
    }

    async delete(workspaceId: string): Promise<void> {
        const windowId = await this.get(workspaceId);
        if (windowId !== undefined) {
            const key = workspaceId + this.POSTFIX;
            const reverseKey = windowId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }

    async deleteByWindowId(windowId: number): Promise<void> {
        const workspaceId = await this.getByWindowId(windowId);
        if (workspaceId !== undefined) {
            const key = workspaceId + this.POSTFIX;
            const reverseKey = windowId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }
}
