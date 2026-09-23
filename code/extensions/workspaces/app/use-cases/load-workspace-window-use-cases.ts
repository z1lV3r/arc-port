import { Workspace } from "../domain/models/workspace";
import { LoadWorkspaceTabUseCases } from "./load-workspace-tab-use-cases";
import { LoadWorkspaceTabGroupUseCases } from "./load-workspace-tab-group-use-cases";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";

import { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";

export class LoadWorkspaceWindowUseCases {
    private browserWindowService: BrowserWindowService;
    private loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;
    private loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;
    private workspaceWindowRepository: WorkspaceWindowRepository;

    constructor(
        browserWindowService: BrowserWindowService,
        loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases,
        loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases,
        workspaceWindowRepository: WorkspaceWindowRepository,
    ) {
        this.browserWindowService = browserWindowService;
        this.loadWorkspaceTabUseCases = loadWorkspaceTabUseCases;
        this.loadWorkspaceTabGroupUseCases = loadWorkspaceTabGroupUseCases;
        this.workspaceWindowRepository = workspaceWindowRepository;
    }

  async loadWorkspaceWindow(workspace: Workspace) {
    await this.loadWorkspaceWindowBaseElements(workspace);
    //TODO load pinned tabs
    //TODO load tab groups
  }

  private async loadWorkspaceWindowBaseElements(workspace: Workspace) {
    const newWindow = await this.browserWindowService.create();
    await this.workspaceWindowRepository.save(workspace.id, newWindow.id);
    //TODO: register window in session storage
    await this.loadWorkspaceTabUseCases.loadWorkspaceDefaultTab(newWindow.id, workspace.id);
    await this.loadWorkspaceTabGroupUseCases.loadWorkspaceDefaultGroup(newWindow.id, workspace);
  }
}