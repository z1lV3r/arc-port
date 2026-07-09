import type { CustomIconRepository } from "@/features/tab-rebrand/domain/interfaces/custom-icon-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { OriginalTabInformationService } from "../../domain/interfaces/original-tab-information-service";
import type { OriginalIconRepository } from "../../domain/interfaces/original-icon-repository";

export class ClearTabCustomIconUseCases {
    private tabsService: BrowserTabsService;
    private originalTabInformationService: OriginalTabInformationService;
    private customIconRepository: CustomIconRepository;
    private originalIconRepository: OriginalIconRepository;

    constructor(
        tabsService: BrowserTabsService,
        customIconRepository: CustomIconRepository,
        originalIconRepository: OriginalIconRepository,
        originalTabInformationService: OriginalTabInformationService
    ) {
        this.tabsService = tabsService;
        this.customIconRepository = customIconRepository;
        this.originalIconRepository = originalIconRepository;
        this.originalTabInformationService = originalTabInformationService;
    }

    async clearCurrentTabCustomIcon(): Promise<void> {
        const currentTab = await this.tabsService.getCurrentTab();
        await this.customIconRepository.delete(currentTab.id);
        let originalIcon = await this.originalIconRepository.get(currentTab.id);
        if (!originalIcon) {
            originalIcon = await this.originalTabInformationService.getOriginalIcon(currentTab.id);
        }
        await this.tabsService.setTabIcon(currentTab.id, originalIcon);
        await this.originalIconRepository.delete(currentTab.id);
    }
}