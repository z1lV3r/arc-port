import type { CustomNameRepository } from "@/features/tab-rebrand/domain/interfaces/custom-name-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { OriginalNameRepository } from "../../domain/interfaces/original-name-repository";
import type { OriginalTabInformationService } from "../../domain/interfaces/original-tab-information-service";

export class ClearTabCustomNameUseCases {
    private tabsService: BrowserTabsService;
    private originalTabInformationService: OriginalTabInformationService;
    private customNameRepository: CustomNameRepository;
    private originalNameRepository: OriginalNameRepository;

    constructor(
        tabsService: BrowserTabsService,
        originalTabInformationService: OriginalTabInformationService,
        customNameRepository: CustomNameRepository,
        originalNameRepository: OriginalNameRepository
    ) {
        this.tabsService = tabsService;
        this.originalTabInformationService = originalTabInformationService;
        this.customNameRepository = customNameRepository;
        this.originalNameRepository = originalNameRepository;
    }

    async clearCurrentTabCustomName(): Promise<void> {
        const currentTab = await this.tabsService.getCurrentTab();
        await this.customNameRepository.delete(currentTab.id);
        let originalName = await this.originalNameRepository.get(currentTab.id);
        if (!originalName) {
            originalName = await this.originalTabInformationService.getOriginalName(currentTab.id);
        }
        await this.tabsService.setTabName(currentTab.id, originalName);
        await this.originalNameRepository.delete(currentTab.id);
    }
}