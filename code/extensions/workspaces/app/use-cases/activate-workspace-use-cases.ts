import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";
import { LoadWorkspaceUseCases } from "./load-workspace-use-cases";
import { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";

export class ActivateWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private workspaceRepository: WorkspaceWindowRepository;
  private loadWorkspaceWindowUseCases: LoadWorkspaceUseCases;
  private workspaceWindowSessionRepository: WorkspaceWindowSessionRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    workspaceRepository: WorkspaceWindowRepository,
    loadWorkspaceWindowUseCases: LoadWorkspaceUseCases,
    workspaceWindowSessionRepository: WorkspaceWindowSessionRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.workspaceRepository = workspaceRepository;
    this.loadWorkspaceWindowUseCases = loadWorkspaceWindowUseCases;
    this.workspaceWindowSessionRepository = workspaceWindowSessionRepository;
  }

  async activateWorkspace(id: string): Promise<void> {
    console.log("[activateWorkspace] Starting", { id });
    const workspace = await this.workspaceRepository.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    console.log("[activateWorkspace] Found workspace", { workspace });

    const workspaceWindowSession = await this.workspaceWindowSessionRepository.get(id);
    console.log("[activateWorkspace] Found workspace window session", { workspaceWindowSession });

    if (workspaceWindowSession) {
      console.log("[activateWorkspace] Focusing window",  { workspaceWindowSession });
      await this.browserWindowService.focus(workspaceWindowSession);
    } else {
      console.log("[activateWorkspace] Loading workspace", { workspace });
      await this.loadWorkspaceWindowUseCases.loadWorkspace(workspace);
    }
    console.log("[activateWorkspace] Done", { id });
  }
}