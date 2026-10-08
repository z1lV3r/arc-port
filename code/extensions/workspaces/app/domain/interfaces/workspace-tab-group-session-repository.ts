export interface WorkspaceTabGroupSessionRepository {
    save(tabGroupId: string, sessionTabGroupId: number): Promise<void>;
    get(tabGroupId: string): Promise<number | undefined>;
    getBySessionTabGroupId(sessionTabGroupId: number): Promise<string | undefined>;
    delete(tabGroupId: string): Promise<void>;
    deleteByTabGroupId(sessionTabGroupId: number): Promise<void>;
}