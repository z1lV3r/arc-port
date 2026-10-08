export interface WorkspaceTabSessionRepository {
    save(tabId: string, sessionTabId: number): Promise<void>;
    get(tabId: string): Promise<number | undefined>;
    getBySessionTabId(sessionTabId: number): Promise<string | undefined>;
    delete(tabId: string): Promise<void>;
    deleteByTabId(sessionTabId: number): Promise<void>;
}
