import type { CustomNameRepository } from "@/features/tab-rebrand/domain/interfaces/custom-name-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class ClearTabCustomNameUseCases {
    private tabsService: BrowserTabsService;
    private customNameRepository: CustomNameRepository;

    constructor(
        tabsService: BrowserTabsService,
        customNameRepository: CustomNameRepository
    ) {
        this.tabsService = tabsService;
        this.customNameRepository = customNameRepository;
    }

    async clearCurrentTabCustomName(): Promise<void> {
        const currentTab = await this.tabsService.getCurrentTab();
        if (!currentTab.url) {
            return;
        }
        await this.customNameRepository.delete(currentTab.id);
        //await this.tabsService.clearCustomName(currentTab.id);
    }
}