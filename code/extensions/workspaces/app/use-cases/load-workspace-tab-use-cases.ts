import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { Tab } from "@repo/shared/domain/models/tab";
import type { WorkspaceTabRepository } from "../domain/interfaces/workspace-tab-repository";
import type { WorkspaceTabGroupRepository } from "../domain/interfaces/workspace-tab-group-repository";
import type { WorkspaceTabGroupSessionRepository } from "../domain/interfaces/workspace-tab-group-session-repository";

export class LoadWorkspaceTabUseCases {
    private browserTabsService: BrowserTabsService;
    private browserTabGroupService: BrowserTabGroupService;
    private workspaceTabRepository: WorkspaceTabRepository;
    private workspaceTabGroupRepository: WorkspaceTabGroupRepository;
    private workspaceTabGroupSessionRepository: WorkspaceTabGroupSessionRepository;

    constructor(
        browserTabsService: BrowserTabsService,
        browserTabGroupService: BrowserTabGroupService,
        workspaceTabRepository: WorkspaceTabRepository,
        workspaceTabGroupRepository: WorkspaceTabGroupRepository,
        workspaceTabGroupSessionRepository: WorkspaceTabGroupSessionRepository,
    ) {
        this.browserTabsService = browserTabsService;
        this.browserTabGroupService = browserTabGroupService;
        this.workspaceTabRepository = workspaceTabRepository;
        this.workspaceTabGroupRepository = workspaceTabGroupRepository;
        this.workspaceTabGroupSessionRepository = workspaceTabGroupSessionRepository;
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
        const tabGroupIdToSessionGroupId = new Map<string, number>();

        for (let i = 0; i < tabs.length; i++) {
            const tabId = tabs[i];
            const workspaceTab = await this.workspaceTabRepository.get(tabId);
            const isPinned = workspaceTab.type === "pin" || workspaceTab.type === "ws";

            const createdTab = await this.browserTabsService.createTab(
                new Tab(
                    "",
                    workspaceTab.checkpointUrl || undefined,
                    i,
                    undefined,
                    isPinned,
                    undefined,
                    undefined,
                    windowId,
                ),
            );

            if (!createdTab.id) {
                throw new Error(`Failed to create tab for workspace tab ${tabId}`);
            }

            if (workspaceTab.tabGroupId && !isPinned) {
                let sessionGroupId = tabGroupIdToSessionGroupId.get(workspaceTab.tabGroupId);

                if (sessionGroupId === undefined) {
                    const tabGroup = await this.workspaceTabGroupRepository.get(workspaceTab.tabGroupId);
                    const createdGroup = await this.browserTabGroupService.createGroup(
                        tabGroup.title,
                        tabGroup.color,
                        createdTab.id,
                        windowId,
                    );
                    sessionGroupId = createdGroup.id;
                    tabGroupIdToSessionGroupId.set(workspaceTab.tabGroupId, sessionGroupId);
                    await this.workspaceTabGroupSessionRepository.save(workspaceTab.tabGroupId, sessionGroupId);
                } else {
                    await chrome.tabs.group({ tabIds: parseInt(createdTab.id), groupId: sessionGroupId });
                }
            }
        }
    }

}
