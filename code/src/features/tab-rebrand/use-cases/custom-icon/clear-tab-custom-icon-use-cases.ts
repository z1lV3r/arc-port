import type { CustomIconRepository } from "@/features/tab-rebrand/domain/interfaces/custom-icon-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class ClearTabCustomIconUseCases {
    private tabsService: BrowserTabsService;
    private customIconRepository: CustomIconRepository;

    constructor(
        tabsService: BrowserTabsService,
        customIconRepository: CustomIconRepository
    ) {
        this.tabsService = tabsService;
        this.customIconRepository = customIconRepository;
    }

    async clearCurrentTabCustomIcon(): Promise<void> {
        const currentTab = await this.tabsService.getCurrentTab();
        if (!currentTab.url) {
            return;
        }
        await this.customIconRepository.delete(currentTab.id);
        await this.tabsService.clearCustomIcon(currentTab.id);
    }
}