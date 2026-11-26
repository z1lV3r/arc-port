
import { LoadWorkspaceTabUseCases } from "@/app/use-cases/load-workspace-tab-use-cases";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

export class OnTabRemovedUnloadWorkspaceTab implements TabEventListener {
    private readonly loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;

    constructor(loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases) {
        this.loadWorkspaceTabUseCases = loadWorkspaceTabUseCases;
    }

    name = "on-tab-removed-unload-workspace-tab";
    description = t(
        "browser_events.on_tab_removed_unload_workspace_tab",
    );
    command = async (tabId: number) => {
        await this.loadWorkspaceTabUseCases.unloadWorkspaceTab(tabId);
    };
}