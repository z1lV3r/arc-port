import type { WorkspaceTabGroupSessionRepository } from "../domain/interfaces/workspace-tab-group-session-repository";

export class ChromeSessionStorageWorkspaceTabGroupSessionRepository implements WorkspaceTabGroupSessionRepository {
    private readonly POSTFIX = "_workspace_tab_group";
    private readonly REVERSE_POSTFIX = "_tab_group_workspace";

    async save(tabGroupId: string, sessionTabGroupId: number): Promise<void> {
        const key = tabGroupId + this.POSTFIX;
        const reverseKey = sessionTabGroupId.toString() + this.REVERSE_POSTFIX;
        await chrome.storage.session.set({
            [key]: sessionTabGroupId,
            [reverseKey]: tabGroupId
        });
    }

    async get(tabGroupId: string): Promise<number | undefined> {
        const key = tabGroupId + this.POSTFIX;
        const result = await chrome.storage.session.get(key);
        return result[key];
    }

    async getBySessionTabGroupId(sessionTabGroupId: number): Promise<string | undefined> {
        const reverseKey = sessionTabGroupId.toString() + this.REVERSE_POSTFIX;
        const result = await chrome.storage.session.get(reverseKey);
        return result[reverseKey];
    }

    async delete(tabGroupId: string): Promise<void> {
        const sessionTabGroupId = await this.get(tabGroupId);
        if (sessionTabGroupId !== undefined) {
            const key = tabGroupId + this.POSTFIX;
            const reverseKey = sessionTabGroupId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }

    async deleteBySessionTabGroupId(sessionTabGroupId: number): Promise<void> {
        const tabGroupId = await this.getBySessionTabGroupId(sessionTabGroupId);
        if (tabGroupId !== undefined) {
            const key = tabGroupId + this.POSTFIX;
            const reverseKey = sessionTabGroupId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }
}
