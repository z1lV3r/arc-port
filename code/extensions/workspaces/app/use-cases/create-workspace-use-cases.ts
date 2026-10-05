import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { WorkspaceTabGroup } from "../domain/models/workspace-tab-group";
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

  async saveWorkspace(name: string, iconUrl: string, color: string, workspaceTabGroupOrder: string[]): Promise<void> {
    const id = generateId();
    await this.workspaceRepository.save(id, name, iconUrl, color, workspaceTabGroupOrder);
    await this.orderWorkspaceUseCases.push(id);
    await this.activateWorkspaceUseCases.activateWorkspace(id);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
