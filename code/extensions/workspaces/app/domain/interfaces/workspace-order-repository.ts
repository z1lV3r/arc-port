export interface WorkspaceOrderRepository {
    push(id: string): Promise<void>;
    getAll(): Promise<string[]>;
    remove(id: string): Promise<void>;
    put(ids: string[]): Promise<void>;
}