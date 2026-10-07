import { WorkspaceWindow } from "../domain/models/workspace-window";
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

  async loadWorkspace(workspace: WorkspaceWindow) {
    console.log("[loadWorkspace] Starting", { workspace });
    const newWindow = await this.browserWindowService.create();
    console.log("[loadWorkspace] Created window", { newWindow });
    await this.workspaceWindowSessionRepository.save(workspace.id, newWindow.id);
    console.log("[loadWorkspace] Saved window session", { workspace });
    await this.loadWorkspaceTabUseCases.loadWorkspaceTabs(newWindow.id, workspace.workspaceTabOrder);
    console.log("[loadWorkspace] Loaded tabs", { workspace });
  }
}