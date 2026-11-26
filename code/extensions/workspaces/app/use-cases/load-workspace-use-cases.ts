import { WorkspaceWindow } from "../domain/models/workspace-window";
import { LoadWorkspaceTabUseCases } from "./load-workspace-tab-use-cases";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";

import { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";

export class LoadWorkspaceWindowUseCases {
  private browserWindowService: BrowserWindowService;
  private loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;
  private workspaceWindowSessionRepository: WorkspaceWindowSessionRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases,
    workspaceWindowSessionRepository: WorkspaceWindowSessionRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.loadWorkspaceTabUseCases = loadWorkspaceTabUseCases;
    this.workspaceWindowSessionRepository = workspaceWindowSessionRepository;
  }

  async loadWorkspace(workspace: WorkspaceWindow) {
    const newWindow = await this.browserWindowService.create();
    await this.workspaceWindowSessionRepository.save(workspace.id, newWindow.id);
    await this.loadWorkspaceTabUseCases.loadWorkspaceTabs(newWindow.id, workspace.workspaceTabOrder);
  }

  async unloadWorkspace(windowId: number) {
    await this.workspaceWindowSessionRepository.deleteByWindowId(windowId);
    //await this.loadWorkspaceTabGroupUseCases.unloadWorkspaceTabGroups(windowId);
  }
}