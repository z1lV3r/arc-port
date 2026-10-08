import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";
import { WorkspaceTabGroupRepository } from "../domain/interfaces/workspace-tab-group-repository";
import { WorkspaceTabGroupSessionRepository } from "../domain/interfaces/workspace-tab-group-session-repository";

export class LoadWorkspaceTabGroupUseCases {

    private browserTabGroupService: BrowserTabGroupService;
    private workspaceTabGroupRepository: WorkspaceTabGroupRepository;
    private workspaceTabGroupSessionRepository: WorkspaceTabGroupSessionRepository;

    constructor(
        browserTabGroupService: BrowserTabGroupService,
        workspaceTabGroupRepository: WorkspaceTabGroupRepository,
        workspaceTabGroupSessionRepository: WorkspaceTabGroupSessionRepository,
    ) {
        this.browserTabGroupService = browserTabGroupService;
        this.workspaceTabGroupRepository = workspaceTabGroupRepository;
        this.workspaceTabGroupSessionRepository = workspaceTabGroupSessionRepository;
    }

    async loadWorkspaceTabGroup(windowId: number, tabsGrouped: string[], groupId: string) {
        const workspaceTabGroup = await this.workspaceTabGroupRepository.get(groupId);

        //create tabs group
        const createdGroup = await this.browserTabGroupService.createGroup(
            workspaceTabGroup.title,
            workspaceTabGroup.color,
            tabsGrouped,
            windowId,
        );
        //associate group id with workspace tab group

        await this.workspaceTabGroupSessionRepository.save(groupId, createdGroup.id);
    }

    async unloadWorkspaceTabGroup(groupId: number) {
        await this.workspaceTabGroupSessionRepository.deleteByTabGroupId(groupId);
    }
}