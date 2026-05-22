import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CustomIconRepository } from "@/features/tab-rebrand/domain/interfaces/custom-icon-repository";

export class SetTabCustomIconUseCases {

  private tabsService: BrowserTabsService;
  private customIconRepository: CustomIconRepository;

  constructor(
    tabsService: BrowserTabsService,
    customIconRepository: CustomIconRepository
  ) {
    this.tabsService = tabsService;
    this.customIconRepository = customIconRepository;
  }

  async setCurrentTabCustomIcon(iconUrl: string): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    if (!currentTab.url) {
      return "";
    }
    await this.customIconRepository.save(currentTab.id, iconUrl);
    const customIcon: string = await this.customIconRepository.get(currentTab.id);
    await this.tabsService.setTabIcon(currentTab.id, customIcon);
    return customIcon;
  }
}