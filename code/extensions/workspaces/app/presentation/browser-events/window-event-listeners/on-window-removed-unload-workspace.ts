
import type { WindowEventListener } from "@repo/shared/domain/models/window-event-listener";
import type { LoadWorkspaceWindowUseCases } from "../../../use-cases/load-workspace-use-cases";

export class OnWindowRemovedUnloadWorkspace implements WindowEventListener {
    private readonly loadWorkspaceUseCases: LoadWorkspaceWindowUseCases;

    constructor(loadWorkspaceUseCases: LoadWorkspaceWindowUseCases) {
        this.loadWorkspaceUseCases = loadWorkspaceUseCases;
    }

    name = "on-window-removed-unload-workspace";
    description = t(
        "browser_events.on_window_removed_unload_workspace",
    );
    command = async (windowId: number) => {
        await this.loadWorkspaceUseCases.unloadWorkspace(windowId);
    };
}
