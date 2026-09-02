import { WorkspaceOrderRepository } from "../domain/interfaces/workspace-order-repository";

export class OrderWorkspaceUseCases {
    private workspaceOrderRepository: WorkspaceOrderRepository;

    constructor(
        workspaceOrderRepository: WorkspaceOrderRepository,
    ) {
        this.workspaceOrderRepository = workspaceOrderRepository;
    }

    async push(id: string): Promise<void> {
        await this.workspaceOrderRepository.push(id);
    }

    async getAll(): Promise<string[]> {
        return await this.workspaceOrderRepository.getAll();
    }

    async reorder(ids: string[]): Promise<void> {
        await this.workspaceOrderRepository.put(ids);
    }

    async remove(id: string): Promise<void> {
        await this.workspaceOrderRepository.remove(id);
    }
}