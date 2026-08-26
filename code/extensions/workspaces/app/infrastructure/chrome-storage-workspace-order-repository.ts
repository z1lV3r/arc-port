import type { WorkspaceOrderRepository } from "../domain/interfaces/workspace-order-repository";

export class ChromeStorageWorkspaceOrderRepository implements WorkspaceOrderRepository {
    private readonly KEY = "workspaceOrder";

    async getAll(): Promise<string[]> {
        const result = await chrome.storage.local.get(this.KEY);
        return result.workspaceOrder || [];
    }

    async remove(id: string): Promise<void> {
        const workspaceOrder = await this.getAll();
        const index = workspaceOrder.indexOf(id);
        if (index > -1) {
            workspaceOrder.splice(index, 1);
            await this.put(workspaceOrder);
        }
    }

    async put(ids: string[]): Promise<void> {
        await chrome.storage.local.set({ workspaceOrder: ids });
    }

    async push(id: string): Promise<void> {
        const workspaceOrder = await this.getAll();
        workspaceOrder.push(id);
        await this.put(workspaceOrder);
    }
}