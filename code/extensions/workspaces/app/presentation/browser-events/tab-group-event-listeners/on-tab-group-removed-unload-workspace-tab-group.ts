import { LoadWorkspaceTabGroupUseCases } from "@/app/use-cases/load-workspace-tab-group-use-cases";

import type { TabGroupEventListener } from "@repo/shared/domain/models/tab-group-event-listener";

export class OnTabGroupRemovedUnloadWorkspaceTabGroup implements TabGroupEventListener {
    private readonly loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;

    constructor(loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases) {
        this.loadWorkspaceTabGroupUseCases = loadWorkspaceTabGroupUseCases;
    }

    name = "on-tab-group-removed-unload-workspace-tab-group";
    description = t(
        "browser_events.on_tab_group_removed_unload_workspace_tab_group",
    );
    command = async (tabGroupId: number) => {
        await this.loadWorkspaceTabGroupUseCases.unloadWorkspaceTabGroup(tabGroupId);
    };
}
