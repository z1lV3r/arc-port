import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { WorkspaceSessionRepository } from "../domain/interfaces/workspace-session-repository";
import { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import { WorkspaceSession } from "../domain/models/workspace-session";

export class ActivateWorkspaceUseCases {
  private browserWindowService: BrowserWindowService;
  private browserTabsService: BrowserTabsService;
  private browserTabGroupService: BrowserTabGroupService;
  private workspaceSessionRepository: WorkspaceSessionRepository;
  private workspaceRepository: WorkspaceRepository;

  constructor(
    browserWindowService: BrowserWindowService,
    browserTabsService: BrowserTabsService,
    browserTabGroupService: BrowserTabGroupService,
    workspaceSessionRepository: WorkspaceSessionRepository,
    workspaceRepository: WorkspaceRepository,
  ) {
    this.browserWindowService = browserWindowService;
    this.browserTabsService = browserTabsService;
    this.browserTabGroupService = browserTabGroupService;
    this.workspaceSessionRepository = workspaceSessionRepository;
    this.workspaceRepository = workspaceRepository;
  }

  async activateWorkspace(id: string): Promise<void> {
    console.log(`Activating workspace with id: ${id}`);
    const workspace = await this.workspaceRepository.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    console.log(`Workspace found: ${workspace.name}`);
    const session = await this.workspaceSessionRepository.get(id);
    console.log(`Workspace session found: ${session}`);
    if (session) {
      await this.browserWindowService.focus(session.windowId);
    } else {
      await this.newSession(workspace.name, workspace.color, workspace.id);
    }
  }

  private async newSession(name: string, color: string, id: string) {
    // Create new window with extension page, passing workspace id as query param
    const pageUrl = `${chrome.runtime.getURL("page.html")}?workspaceId=${encodeURIComponent(id)}`;
    const newWindow = await this.browserWindowService.create(pageUrl);

    // Pin the options tab
    const pinnedTab = newWindow.tabs?.[0] ;
    if (!pinnedTab?.id) {
      throw new Error("Failed to create pinned tab");
    }

    await this.browserTabsService.setTabPinned(pinnedTab.id, true);

    // Create new empty tab
    const emptyTab = await this.browserTabsService.createEmptyTab(newWindow.id);

    // Create tab group with empty tab
    let group;
    if (emptyTab.id) {
      group = await this.browserTabGroupService.createGroup(name, color, emptyTab.id, newWindow.id);
    }

    if (!group?.id) {
      throw new Error("Failed to create tab group");
    }

    await this.workspaceSessionRepository.create(
      new WorkspaceSession(
        id,
        newWindow.id,
        group.id,
        pinnedTab.id,
      ),
    );
  }
}