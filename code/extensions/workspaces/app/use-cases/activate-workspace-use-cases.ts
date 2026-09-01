import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";

export class ActivateWorkspaceUseCases {
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

  async activateWorkspace(name: string, color: string, id: string): Promise<void> {

    //If it has a session bring to front

    //else


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
}