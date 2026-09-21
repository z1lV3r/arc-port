import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { Workspace } from "../domain/models/workspace";

export class ActivateWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private browserTabsService: BrowserTabsService;
  private browserTabGroupService: BrowserTabGroupService;
  private workspaceRepository: WorkspaceRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    browserTabsService: BrowserTabsService,
    browserTabGroupService: BrowserTabGroupService,
    workspaceRepository: WorkspaceRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.browserTabsService = browserTabsService;
    this.browserTabGroupService = browserTabGroupService;
    this.workspaceRepository = workspaceRepository;
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
      await this.createWorkspaceSession(workspace);
    }
  }

  private async createWorkspaceSession(workspace: Workspace) {
    const newWindowId = await this.createWorkspaceWindow();
    await this.createWorkspaceTab(newWindowId, workspace.id);
    await this.createWorkspaceDefaultGroup(newWindowId, workspace);
    //TODO create pinned tabs
    //TODO create tab groups
  }

  private async createWorkspaceWindow(): Promise<number> {
    const newWindow = await this.browserWindowService.create();

    if (!newWindow.id) {
      throw new Error("Failed to create new window");
    }
    
    return newWindow.id;
  }

  private async createWorkspaceTab(windowId: number, workspaceId: string): Promise<string> {
    const pageUrl = `${chrome.runtime.getURL("page.html")}?workspaceId=${encodeURIComponent(workspaceId)}`;
    const pinnedTab = await this.browserTabsService.getTabByIndex(0, windowId);

    if (!pinnedTab.id) {
      throw new Error("Failed to create pinned tab");
    }

    await this.browserTabsService.setTabUrl(pinnedTab.id, pageUrl);
    await this.browserTabsService.setTabPinned(pinnedTab.id, true);
    return pinnedTab.id;
  }

  private async createWorkspaceDefaultGroup(windowId: number, workspace: Workspace) {
    const emptyTab = await this.browserTabsService.createEmptyTab(windowId); //TODO: Get default default group tabs or create one empty tab

    if (!emptyTab.id) {
      throw new Error("Failed to create tab group");
    }

    const group = await this.browserTabGroupService.createGroup(workspace.name, workspace.color, emptyTab.id, windowId);

    if (!group.id) {
      throw new Error("Failed to create tab group");
    }
  }
}