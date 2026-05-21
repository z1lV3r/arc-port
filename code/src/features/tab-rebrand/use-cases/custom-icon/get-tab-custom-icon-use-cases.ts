import type { CustomIconRepository } from "@/features/tab-rebrand/domain/interfaces/custom-icon-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class GetTabCustomIconUseCases {
  private tabsService: BrowserTabsService;
  private customIconRepository: CustomIconRepository;

  constructor(
    tabsService: BrowserTabsService,
    customIconRepository: CustomIconRepository
  ) {
    this.tabsService = tabsService;
    this.customIconRepository = customIconRepository;
  }

  async getCurrentTabCustomIcon(): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    if (!currentTab.url) {
      return "";
    }
    return await this.customIconRepository.get(currentTab.id);
  }
}