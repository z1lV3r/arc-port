import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { Workspace } from "../domain/models/workspace";
import { LoadWorkspaceWindowUseCases } from "./load-workspace-window-use-cases";

export class ActivateWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private workspaceRepository: WorkspaceRepository;
  private loadWorkspaceWindowUseCases: LoadWorkspaceWindowUseCases;

  constructor(
    browserWindowService: BrowserWindowService,
    workspaceRepository: WorkspaceRepository,
    loadWorkspaceWindowUseCases: LoadWorkspaceWindowUseCases,
  ) {
    this.browserWindowService = browserWindowService;
    this.workspaceRepository = workspaceRepository;
    this.loadWorkspaceWindowUseCases = loadWorkspaceWindowUseCases;
  }

  async activateWorkspace(id: string): Promise<void> {
    console.log(`Activating workspace with id: ${id}`);
    const workspace = await this.workspaceRepository.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    console.log(`Workspace found: ${workspace.name}`);
    
    //TODO Check active windows for a session of this workspace
    const workspaceWindow = null;
    console.log(`Workspace window found: ${workspaceWindow}`);
    if (workspaceWindow) {
      await this.browserWindowService.focus(workspaceWindow);
    } else {
      await this.loadWorkspaceWindowUseCases.loadWorkspaceWindow(workspace);
    }
  }  
}