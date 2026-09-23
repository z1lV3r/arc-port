import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { Workspace } from "../domain/models/workspace";

export class LoadWorkspaceTabGroupUseCases {
    private browserTabsService: BrowserTabsService;
    private browserTabGroupService: BrowserTabGroupService;
    constructor(
        browserTabsService: BrowserTabsService,
        browserTabGroupService: BrowserTabGroupService,
    ) {
        this.browserTabsService = browserTabsService;
        this.browserTabGroupService = browserTabGroupService;
    }

    async loadWorkspaceDefaultGroup(windowId: number, workspace: Workspace) {
        const emptyTab = await this.browserTabsService.createEmptyTab(windowId); //TODO: Get default default group tabs or create one empty tab

        if (!emptyTab.id) {
            throw new Error("Failed to create tab group");
        }

        const group = await this.browserTabGroupService.createGroup(workspace.name, workspace.color, emptyTab.id, windowId);

        if (!group.id) {
            throw new Error("Failed to create tab group");
        }

        //TODO: register tab group in session storage
    }
}