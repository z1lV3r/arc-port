export interface WorkspaceTabGroupSessionRepository {
    save(tabGroupId: string, sessionTabGroupId: number): Promise<void>;
    get(tabGroupId: string): Promise<number | undefined>;
    getBySessionTabGroupId(sessionTabGroupId: number): Promise<string | undefined>;
    delete(tabGroupId: string): Promise<void>;
    deleteBySessionTabGroupId(sessionTabGroupId: number): Promise<void>;
}