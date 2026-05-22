import type { CustomNameRepository } from "@/features/tab-rebrand/domain/interfaces/custom-name-repository";
import type { OriginalNameRepository } from "@/features/tab-rebrand/domain/interfaces/original-name-repository";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

export class SetTabCustomNameUseCases {

  private tabsService: BrowserTabsService;
  private customNameRepository: CustomNameRepository;
  private originalNameRepository: OriginalNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    customNameRepository: CustomNameRepository,
    originalNameRepository: OriginalNameRepository
  ) {
    this.tabsService = tabsService;
    this.customNameRepository = customNameRepository;
    this.originalNameRepository = originalNameRepository;
  }

  async setCurrentTabCustomName(name: string): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    const currentCustomName: string = await this.customNameRepository.get(currentTab.id);

    if(!currentCustomName) {
      const originalTabName = await this.tabsService.getTabName(currentTab.id);
      await this.originalNameRepository.save(currentTab.id, originalTabName);
    }

    await this.customNameRepository.save(currentTab.id, name);
    await this.tabsService.setTabName(currentTab.id, name);

    const updatedName: string = await this.customNameRepository.get(currentTab.id);
    return updatedName;
  }
}