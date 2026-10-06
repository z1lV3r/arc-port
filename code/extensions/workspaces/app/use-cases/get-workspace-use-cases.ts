import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";
import type { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";
import type { WorkspaceWindow } from "../domain/models/workspace-window";

export class GetWorkspaceUseCases {
  private workspaceRepository: WorkspaceWindowRepository;
  private browserWindowService: BrowserWindowService;
  private workspaceWindowRepository: WorkspaceWindowSessionRepository;

  constructor(
    workspaceRepository: WorkspaceWindowRepository,
    browserWindowService: BrowserWindowService,
    workspaceWindowRepository: WorkspaceWindowSessionRepository,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWindowService = browserWindowService;
    this.workspaceWindowRepository = workspaceWindowRepository;
  }

  async getWorkspace(id: string): Promise<WorkspaceWindow> {
    return await this.workspaceRepository.get(id);
  }

  async getCurrentWorkspace(): Promise<WorkspaceWindow> {
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const workspaceId = await this.workspaceWindowRepository.getByWindowId(currentWindow.id);
    if (!workspaceId) {
      throw new Error("No workspace found");
    }
    return await this.workspaceRepository.get(workspaceId);
  }

  async listWorkspaces(): Promise<WorkspaceWindow[]> {
    return await this.workspaceRepository.list();
  }
}