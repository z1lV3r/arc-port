import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { Workspace } from "../domain/models/workspace";
import { LoadWorkspaceWindowUseCases } from "./load-workspace-window-use-cases";
import { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";

export class ActivateWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private workspaceRepository: WorkspaceRepository;
  private loadWorkspaceWindowUseCases: LoadWorkspaceWindowUseCases;
  private workspaceWindowRepository: WorkspaceWindowRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    workspaceRepository: WorkspaceRepository,
    loadWorkspaceWindowUseCases: LoadWorkspaceWindowUseCases,
    workspaceWindowRepository: WorkspaceWindowRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.workspaceRepository = workspaceRepository;
    this.loadWorkspaceWindowUseCases = loadWorkspaceWindowUseCases;
    this.workspaceWindowRepository = workspaceWindowRepository;
  }

  async activateWorkspace(id: string): Promise<void> {
    console.log(`Activating workspace with id: ${id}`);
    const workspace = await this.workspaceRepository.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const workspaceWindow = await this.workspaceWindowRepository.get(id);
    if (workspaceWindow) {
      await this.browserWindowService.focus(workspaceWindow);
    } else {
      await this.loadWorkspaceWindowUseCases.loadWorkspaceWindow(workspace);
    }
  }  
}