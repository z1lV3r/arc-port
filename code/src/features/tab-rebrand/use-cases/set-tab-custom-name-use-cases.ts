import type { CustomNameRepository } from "@/features/tab-rebrand/domain/interfaces/custom-name-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class SetTabCustomNameUseCases {

  private tabsService: BrowserTabsService;
  private customNameRepository: CustomNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    customNameRepository: CustomNameRepository
  ) {
    this.tabsService = tabsService;
    this.customNameRepository = customNameRepository;
  }

  async setCurrentTabCustomName(name: string): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    if (!currentTab.url) {
      return "";
    }
    await this.customNameRepository.save(currentTab.id, name);
    const customName: string = await this.customNameRepository.get(currentTab.id);
    await this.tabsService.setCustomName(currentTab.id, customName);
    return customName;
  }
}