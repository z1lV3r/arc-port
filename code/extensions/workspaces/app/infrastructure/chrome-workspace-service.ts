import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserWorkspaceService } from "../domain/interfaces/browser-workspace-service";
import type { Workspace } from "../domain/models/workspace";
import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";

export class ChromeWorkspaceService implements BrowserWorkspaceService {

  private browserWindowService: BrowserWindowService;
  private browserTabsService: BrowserTabsService;
  private browserTabGroupService: BrowserTabGroupService;

  constructor(
    browserWindowService: BrowserWindowService,
    browserTabsService: BrowserTabsService,
    browserTabGroupService: BrowserTabGroupService,
  ) {
    this.browserWindowService = browserWindowService;
    this.browserTabsService = browserTabsService;
    this.browserTabGroupService = browserTabGroupService;

  }

  async createWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void> {
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
    if (emptyTab.id) {
      await this.browserTabGroupService.createGroup(name, color, emptyTab.id, newWindow.id);
    }

  }
  async getCurrentWorkspaceId(): Promise<string> {
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const tab = await this.browserTabsService.getTabByIndex(0, currentWindow.id);
    console.log(tab);
    if (!tab.url) {
      throw new Error("Failed to get current workspace");
    }
    const workspaceId = tab.url.split("?workspaceId=")[1];
    console.log(workspaceId);
    if (!workspaceId) {
      throw new Error("Failed to get current workspace");
    }
    return workspaceId;
  }

  async getWorkspace(id: string): Promise<Workspace> {
    throw new Error("Method not implemented.");
  }
  async listWorkspaces(): Promise<Workspace[]> {
    throw new Error("Method not implemented.");
  }
  async updateWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteWorkspace(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}