export interface WorkspaceTabSessionRepository {
    save(tabId: string, sessionTabId: number): Promise<void>;
    get(tabId: string): Promise<number | undefined>;
    getBySessionTabId(sessionTabId: number): Promise<string | undefined>;
    delete(tabId: string): Promise<void>;
    deleteBySessionTabId(sessionTabId: number): Promise<void>;
}
