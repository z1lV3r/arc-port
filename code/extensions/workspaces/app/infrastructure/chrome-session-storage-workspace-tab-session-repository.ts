import type { WorkspaceTabSessionRepository } from "../domain/interfaces/workspace-tab-session-repository";

export class ChromeSessionStorageWorkspaceTabSessionRepository implements WorkspaceTabSessionRepository {
    private readonly POSTFIX = "_workspace_tab";
    private readonly REVERSE_POSTFIX = "_tab_workspace";

    async save(tabId: string, sessionTabId: number): Promise<void> {
        const key = tabId + this.POSTFIX;
        const reverseKey = sessionTabId.toString() + this.REVERSE_POSTFIX;
        await chrome.storage.session.set({
            [key]: sessionTabId,
            [reverseKey]: tabId
        });
    }

    async get(tabId: string): Promise<number | undefined> {
        const key = tabId + this.POSTFIX;
        const result = await chrome.storage.session.get(key);
        return result[key];
    }

    async getBySessionTabId(sessionTabId: number): Promise<string | undefined> {
        const reverseKey = sessionTabId.toString() + this.REVERSE_POSTFIX;
        const result = await chrome.storage.session.get(reverseKey);
        return result[reverseKey];
    }

    async delete(tabId: string): Promise<void> {
        const sessionTabId = await this.get(tabId);
        if (sessionTabId !== undefined) {
            const key = tabId + this.POSTFIX;
            const reverseKey = sessionTabId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }

    async deleteByTabId(sessionTabId: number): Promise<void> {
        const tabId = await this.getBySessionTabId(sessionTabId);
        if (tabId !== undefined) {
            const key = tabId + this.POSTFIX;
            const reverseKey = sessionTabId.toString() + this.REVERSE_POSTFIX;
            await chrome.storage.session.remove([key, reverseKey]);
        }
    }
}
