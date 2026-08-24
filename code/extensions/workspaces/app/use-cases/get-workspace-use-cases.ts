import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import type { BrowserWorkspaceService } from "../domain/interfaces/browser-workspace-service";
import type { Workspace } from "../domain/models/workspace";

export class GetWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private browserWorkspaceService: BrowserWorkspaceService;

  constructor(
    workspaceRepository: WorkspaceRepository,
    browserWorkspaceService: BrowserWorkspaceService,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWorkspaceService = browserWorkspaceService;
  }

  async getWorkspace(id: string): Promise<Workspace> {
    return await this.workspaceRepository.get(id);
  }

  async getCurrentWorkspace(): Promise<Workspace> {
    const workspaceId = await this.browserWorkspaceService.getCurrentWorkspaceId();
    return await this.workspaceRepository.get(workspaceId);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.list();
  } 
}