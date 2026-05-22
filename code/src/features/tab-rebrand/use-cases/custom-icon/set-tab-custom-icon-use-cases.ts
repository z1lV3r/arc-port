import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CustomIconRepository } from "@/features/tab-rebrand/domain/interfaces/custom-icon-repository";
import type { OriginalIconRepository } from "../../domain/interfaces/original-icon-repository";

export class SetTabCustomIconUseCases {

  private tabsService: BrowserTabsService;
  private customIconRepository: CustomIconRepository;
  private originalIconRepository: OriginalIconRepository;

  constructor(
    tabsService: BrowserTabsService,
    customIconRepository: CustomIconRepository,
    originalIconRepository: OriginalIconRepository
  ) {
    this.tabsService = tabsService;
    this.customIconRepository = customIconRepository;
    this.originalIconRepository = originalIconRepository;
  }

  async setCurrentTabCustomIcon(iconUrl: string): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    const currentCustomIcon: string = await this.customIconRepository.get(currentTab.id);

    if(!currentCustomIcon) {
      const originalTabIcon = await this.tabsService.getTabIcon(currentTab.id);
      await this.originalIconRepository.save(currentTab.id, originalTabIcon);
    }
    
    await this.customIconRepository.save(currentTab.id, iconUrl);

    const customIcon: string = await this.customIconRepository.get(currentTab.id);
    await this.tabsService.setTabIcon(currentTab.id, customIcon);
    return customIcon;
  }
}