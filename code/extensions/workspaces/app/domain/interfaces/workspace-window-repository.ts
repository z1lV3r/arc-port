export interface WorkspaceWindowRepository {
    save(workspaceId: string, windowId: number): Promise<void>;
    get(workspaceId: string): Promise<number | undefined>;
    getByWindowId(windowId: number): Promise<string | undefined>;
    delete(workspaceId: string): Promise<void>;
    deleteByWindowId(windowId: number): Promise<void>;
}
