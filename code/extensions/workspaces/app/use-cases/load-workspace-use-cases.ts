import { Workspace } from "../domain/models/workspace";
import { LoadWorkspaceTabUseCases } from "./load-workspace-tab-use-cases";
import { LoadWorkspaceTabGroupUseCases } from "./load-workspace-tab-group-use-cases";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";

import { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";

export class LoadWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;
  private loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;
  private workspaceWindowSessionRepository: WorkspaceWindowSessionRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases,
    loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases,
    workspaceWindowSessionRepository: WorkspaceWindowSessionRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.loadWorkspaceTabUseCases = loadWorkspaceTabUseCases;
    this.loadWorkspaceTabGroupUseCases = loadWorkspaceTabGroupUseCases;
    this.workspaceWindowSessionRepository = workspaceWindowSessionRepository;
  }

  async loadWorkspace(workspace: Workspace) {
    await this.loadWorkspaceBaseElements(workspace);
    //TODO load pinned tabs
    //TODO load tab groups
  }

  private async loadWorkspaceBaseElements(workspace: Workspace) {
    const newWindow = await this.browserWindowService.create();
    await this.workspaceWindowSessionRepository.save(workspace.id, newWindow.id);
    await this.loadWorkspaceTabUseCases.loadWorkspaceDefaultTab(newWindow.id, workspace.id);
    await this.loadWorkspaceTabGroupUseCases.loadWorkspaceDefaultGroup(newWindow.id, workspace);
  }
}