import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { ActivateWorkspaceUseCases } from "./activate-workspace-use-cases";
import type { OrderWorkspaceUseCases } from "./order-workspace-use-cases";

export class CreateWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private orderWorkspaceUseCases: OrderWorkspaceUseCases;
  private activateWorkspaceUseCases: ActivateWorkspaceUseCases;

  constructor(
    workspaceRepository: WorkspaceRepository,
    orderWorkspaceUseCases: OrderWorkspaceUseCases,
    activateWorkspaceUseCases: ActivateWorkspaceUseCases,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.orderWorkspaceUseCases = orderWorkspaceUseCases;
    this.activateWorkspaceUseCases = activateWorkspaceUseCases;
  }

  async createWorkspace(name: string, iconUrl: string, color: string): Promise<void> {
    const id = crypto.randomUUID();
    await this.workspaceRepository.create(id, name, iconUrl, color);
    await this.orderWorkspaceUseCases.push(id);
    await this.activateWorkspaceUseCases.activateWorkspace(name, color, id);
  }

  async updateWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void> {
    await this.workspaceRepository.update(id, name, iconUrl, color);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
