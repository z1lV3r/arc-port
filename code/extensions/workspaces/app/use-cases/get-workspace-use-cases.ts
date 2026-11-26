import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";
import type { WorkspaceWindowSessionRepository } from "../domain/interfaces/workspace-window-session-repository";
import { Workspace } from "../domain/models/workspace";
import { WorkspaceTabGroupRepository } from "../domain/interfaces/workspace-tab-group-repository";
import { WorkspaceTabRepository } from "../domain/interfaces/workspace-tab-repository";

export class GetWorkspaceUseCases {
  private workspaceWindowRepository: WorkspaceWindowRepository;
  private browserWindowService: BrowserWindowService;
  private workspaceWindowSessionRepository: WorkspaceWindowSessionRepository;
  private workspaceTabGroupRepository: WorkspaceTabGroupRepository;
  private workspaceTabRepository: WorkspaceTabRepository;

  constructor(
    workspaceWindowRepository: WorkspaceWindowRepository,
    browserWindowService: BrowserWindowService,
    workspaceWindowSessionRepository: WorkspaceWindowSessionRepository,
    workspaceTabGroupRepository: WorkspaceTabGroupRepository,
    workspaceTabRepository: WorkspaceTabRepository
  ) {
    this.workspaceWindowRepository = workspaceWindowRepository;
    this.browserWindowService = browserWindowService;
    this.workspaceWindowSessionRepository = workspaceWindowSessionRepository;
    this.workspaceTabGroupRepository = workspaceTabGroupRepository;
    this.workspaceTabRepository = workspaceTabRepository;
  }

  async getWorkspace(id: string): Promise<Workspace> {
    console.log("getWorkspace Get workspace use cases");
    const workspaceWindow = await this.workspaceWindowRepository.get(id);
    console.log("getWorkspace Workspace windows:", workspaceWindow);
    const workspaceTab = await this.workspaceTabRepository.get(workspaceWindow.workspaceTabOrder[0]);
    console.log("getWorkspace Workspace tab:", workspaceTab);
    if (!workspaceTab) {
      throw new Error("No workspace tab found");
    }

    let workspaceTabGroup = null;

    for (let tabIndex = 1; tabIndex < workspaceWindow.workspaceTabOrder.length; tabIndex++) {
      const tab = await this.workspaceTabRepository.get(workspaceWindow.workspaceTabOrder[tabIndex]);
      console.log("getWorkspace Tab:", tab);
      if (tab.tabGroupId && tab.tabGroupId !== "") {
        workspaceTabGroup = await this.workspaceTabGroupRepository.get(tab.tabGroupId);
        console.log("getWorkspace Workspace tab group:", workspaceTabGroup);
        break;
      }
    }

    console.log("getWorkspace Workspace tab group:", workspaceTabGroup);
    if (!workspaceTabGroup) {
      throw new Error("No default workspace tab group found");
    }

    console.log("getWorkspace Workspace:", new Workspace(
      workspaceWindow.id,
      workspaceTabGroup.color,
      workspaceTabGroup.title,
      workspaceTab.iconUrl,
    ));
    
    return new Workspace(
      workspaceWindow.id,
      workspaceTabGroup.color,
      workspaceTabGroup.title,
      workspaceTab.iconUrl,
    );
  }

  async getCurrentWorkspace(): Promise<Workspace> {
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const workspaceId = await this.workspaceWindowSessionRepository.getByWindowId(currentWindow.id);
    if (!workspaceId) {
      throw new Error("No workspace found");
    }
    return await this.getWorkspace(workspaceId);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    console.log("listWorkspaces List workspaces use cases");
    const workspaceWindows = await this.workspaceWindowRepository.list();
    console.log("listWorkspaces Workspace windows:", workspaceWindows);
    const resutl = await Promise.all(workspaceWindows.map(async (workspaceWindow) => {
      console.log("listWorkspaces Workspace window:", workspaceWindow);
      const workspace = await this.getWorkspace(workspaceWindow.id);
      console.log("listWorkspaces Workspace:", workspace);
      return workspace;
    }));

    console.log("listWorkspaces resutl:", resutl);
    return resutl
  }
}