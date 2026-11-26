import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@repo/shared/domain/models/tab";
import type { WorkspaceTabRepository } from "../domain/interfaces/workspace-tab-repository";
import type { WorkspaceTabSessionRepository } from "../domain/interfaces/workspace-tab-session-repository";
import { WorkspaceTab } from "../domain/models/workspace-tab";
import { LoadWorkspaceTabGroupUseCases } from "./load-workspace-tab-group-use-cases";

export class LoadWorkspaceTabUseCases {
    private browserTabsService: BrowserTabsService;
    private workspaceTabRepository: WorkspaceTabRepository;
    private workspaceTabSessionRepository: WorkspaceTabSessionRepository;
    private loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;

    constructor(
        browserTabsService: BrowserTabsService,
        workspaceTabRepository: WorkspaceTabRepository,
        workspaceTabSessionRepository: WorkspaceTabSessionRepository,
        loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases
    ) {
        this.browserTabsService = browserTabsService;
        this.workspaceTabRepository = workspaceTabRepository;
        this.workspaceTabSessionRepository = workspaceTabSessionRepository;
        this.loadWorkspaceTabGroupUseCases = loadWorkspaceTabGroupUseCases;
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

    async loadWorkspaceTabs(windowId: number, tabs: string[]) {
        let currentGroup: string = "";
        let tabsGrouped: string[] = [];
        for (let i = 0; i < tabs.length; i++) {
            const tabId = tabs[i];
            const workspaceTab = await this.workspaceTabRepository.get(tabId);

            const temporalTab = await this.loadWorkspaceTemporalTab(workspaceTab, windowId, i);

            const isPinned = workspaceTab.type === "pin" || workspaceTab.type === "ws";
            await this.browserTabsService.setTabPinned(temporalTab.id, isPinned);

            if (workspaceTab.tabGroupId && !isPinned) {
                if (currentGroup === "") {
                    currentGroup = workspaceTab.tabGroupId;
                    tabsGrouped.push(temporalTab.id);
                } else {
                    if (currentGroup === workspaceTab.tabGroupId) {
                        tabsGrouped.push(temporalTab.id);
                    } else {
                        this.loadWorkspaceTabGroupUseCases.loadWorkspaceTabGroup(windowId, tabsGrouped, currentGroup);
                        currentGroup = workspaceTab.tabGroupId;
                        tabsGrouped = [temporalTab.id];
                    }
                }
                if (i === tabs.length - 1) {
                    this.loadWorkspaceTabGroupUseCases.loadWorkspaceTabGroup(windowId, tabsGrouped, currentGroup);
                }
            }
        }
    }

    private async loadWorkspaceTemporalTab(workspaceTab: WorkspaceTab, windowId: number, index: number) {

        const createdTemporalTab = await this.browserTabsService.createTab(
            new Tab(
                "",
                workspaceTab.checkpointUrl || undefined,
                index,
                undefined,
                false, // Temporal tabs are not pinned and not in tab groups
                undefined,
                undefined,
                windowId,
            ),
        );
        if (!createdTemporalTab.id) {
            throw new Error(`Failed to create tab for workspace tab ${workspaceTab.id}`);
        }

        this.workspaceTabSessionRepository.save(workspaceTab.id, parseInt(createdTemporalTab.id));

        return createdTemporalTab;
    }

    async unloadWorkspaceTab(tabId: number) {
        await this.workspaceTabSessionRepository.deleteByTabId(tabId);
    }

}
