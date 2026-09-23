import { Workspace } from "../domain/models/workspace";
import { LoadWorkspaceTabUseCases } from "./load-workspace-tab-use-cases";
import { LoadWorkspaceTabGroupUseCases } from "./load-workspace-tab-group-use-cases";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";

export class LoadWorkspaceWindowUseCases {
    private browserWindowService: BrowserWindowService;
    private loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;
    private loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;
    constructor(
        browserWindowService: BrowserWindowService,
        loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases,
        loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases,
    ) {
        this.browserWindowService = browserWindowService;
        this.loadWorkspaceTabUseCases = loadWorkspaceTabUseCases;
        this.loadWorkspaceTabGroupUseCases = loadWorkspaceTabGroupUseCases;
    }

  async loadWorkspaceWindow(workspace: Workspace) {
    await this.loadWorkspaceWindowBaseElements(workspace);
    //TODO load pinned tabs
    //TODO load tab groups
  }

  private async loadWorkspaceWindowBaseElements(workspace: Workspace) {
    const newWindow = await this.browserWindowService.create();
    //TODO: register window in session storage
    console.log("previous tabs")
    await this.loadWorkspaceTabUseCases.loadWorkspaceDefaultTab(newWindow.id, workspace.id);
    console.log("previous groups")
    await this.loadWorkspaceTabGroupUseCases.loadWorkspaceDefaultGroup(newWindow.id, workspace);
  }
}