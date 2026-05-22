import type { CustomNameRepository } from "@/features/tab-rebrand/domain/interfaces/custom-name-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class GetTabCustomNameUseCases {
  private tabsService: BrowserTabsService;
  private customNameRepository: CustomNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    customNameRepository: CustomNameRepository
  ) {
    this.tabsService = tabsService;
    this.customNameRepository = customNameRepository;
  }

  async getCurrentTabCustomName(): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    return await this.customNameRepository.get(currentTab.id);
  }
}