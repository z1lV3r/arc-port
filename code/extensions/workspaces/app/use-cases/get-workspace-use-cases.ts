import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import type { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";
import type { Workspace } from "../domain/models/workspace";

export class GetWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private browserWindowService: BrowserWindowService;
  private workspaceWindowRepository: WorkspaceWindowSessionRepository;

  constructor(
    workspaceRepository: WorkspaceRepository,
    browserWindowService: BrowserWindowService,
    workspaceWindowRepository: WorkspaceWindowSessionRepository,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWindowService = browserWindowService;
    this.workspaceWindowRepository = workspaceWindowRepository;
  }

  async getWorkspace(id: string): Promise<Workspace> {
    return await this.workspaceRepository.get(id);
  }

  async getCurrentWorkspace(): Promise<Workspace> {
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const workspaceId = await this.workspaceWindowRepository.getByWindowId(currentWindow.id);
    if (!workspaceId) {
      throw new Error("No workspace found");
    }
    return await this.workspaceRepository.get(workspaceId);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.list();
  }
}