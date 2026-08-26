import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import type { BrowserWorkspaceService } from "../domain/interfaces/browser-workspace-service";
import type { OrderWorkspaceUseCases } from "./order-workspace-use-cases";

export class CreateWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private browserWorkspaceService: BrowserWorkspaceService;
  private orderWorkspaceUseCases: OrderWorkspaceUseCases;

  constructor(
    workspaceRepository: WorkspaceRepository,
    browserWorkspaceService: BrowserWorkspaceService,
    orderWorkspaceUseCases: OrderWorkspaceUseCases,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWorkspaceService = browserWorkspaceService;
    this.orderWorkspaceUseCases = orderWorkspaceUseCases;
  }

  async saveWorkspace(name: string, iconUrl: string, color: string): Promise<void> {
    const id = crypto.randomUUID();
    await this.workspaceRepository.create(id, name, iconUrl, color);
    await this.browserWorkspaceService.createWorkspace(id, name, iconUrl, color);
    await this.orderWorkspaceUseCases.push(id);
  }

  async updateWorkspace(id: string, name: string, iconUrl: string, color:string): Promise<void> {
    await this.workspaceRepository.update(id, name, iconUrl, color);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
