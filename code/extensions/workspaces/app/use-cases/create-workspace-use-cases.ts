import type { Workspace } from "../domain/models/workspace";
import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import type { BrowserWorkspaceService } from "../domain/interfaces/browser-workspace-service";

export class CreateWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private browserWorkspaceService: BrowserWorkspaceService;

  constructor(
    workspaceRepository: WorkspaceRepository,
    browserWorkspaceService: BrowserWorkspaceService,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWorkspaceService = browserWorkspaceService;
  }

  async saveWorkspace(name: string, iconUrl: string, color: string): Promise<void> {
    const id = crypto.randomUUID();
    await this.workspaceRepository.create(id, name, iconUrl, color);
    await this.browserWorkspaceService.createWorkspace(id, name, iconUrl, color);
  }

  async getWorkspace(id: string): Promise<Workspace> {
    return await this.workspaceRepository.get(id);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.list();
  }

  async updateWorkspace(id: string, name: string, iconUrl: string, color:string): Promise<void> {
    await this.workspaceRepository.update(id, name, iconUrl, color);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
