import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";

export class LoadWorkspaceTabUseCases {
    private browserTabsService: BrowserTabsService;
    constructor(
        browserTabsService: BrowserTabsService,
    ) {
        this.browserTabsService = browserTabsService;
    }

    async loadWorkspaceDefaultTab(windowId: number, workspaceId: string): Promise<string> {
        console.log("Loading workspace default tab")
        const pageUrl = `${chrome.runtime.getURL("page.html")}?workspaceId=${encodeURIComponent(workspaceId)}`;
        console.log("Loading workspace default tab, page url: ", pageUrl)
        const pinnedTab = await this.browserTabsService.getTabByIndex(0, windowId);

        if (!pinnedTab.id) {
            throw new Error("Failed to create pinned tab");
        }
        console.log("Loading workspace default tab, pinned tab: ", pinnedTab.id)

        await this.browserTabsService.setTabUrl(pinnedTab.id, pageUrl);
        console.log("Loading workspace default tab, pinned tab: ", pinnedTab.id)
        await this.browserTabsService.setTabPinned(pinnedTab.id, true);
        console.log("Loading workspace default tab, pinned tab: ", pinnedTab.id)
        return pinnedTab.id;
    }

}
