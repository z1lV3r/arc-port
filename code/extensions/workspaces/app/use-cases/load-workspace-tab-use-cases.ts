import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";

export class LoadWorkspaceTabUseCases {
    private browserTabsService: BrowserTabsService;
    constructor(
        browserTabsService: BrowserTabsService,
    ) {
        this.browserTabsService = browserTabsService;
    }

    async loadWorkspaceDefaultTab(windowId: number, workspaceId: string): Promise<string> {
        const pageUrl = `${chrome.runtime.getURL("page.html")}?workspaceId=${encodeURIComponent(workspaceId)}`;
        const pinnedTab = await this.browserTabsService.getTabByIndex(0, windowId);

        if (!pinnedTab.id) {
            throw new Error("Failed to create pinned tab");
        }

        await this.browserTabsService.setTabUrl(pinnedTab.id, pageUrl);
        await this.browserTabsService.setTabPinned(pinnedTab.id, true);
        return pinnedTab.id;
    }

}
