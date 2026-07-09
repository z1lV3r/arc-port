import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { CustomNameRepository } from "../domain/interfaces/custom-name-repository.ts";
import type { OriginalNameRepository } from "../domain/interfaces/original-name-repository.ts";

export class SetTabCustomNameUseCases {
  private tabsService: BrowserTabsService;
  private customNameRepository: CustomNameRepository;
  private originalNameRepository: OriginalNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    customNameRepository: CustomNameRepository,
    originalNameRepository: OriginalNameRepository,
  ) {
    this.tabsService = tabsService;
    this.customNameRepository = customNameRepository;
    this.originalNameRepository = originalNameRepository;
  }

  async setCurrentTabCustomName(name: string): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    const currentCustomName: string = await this.customNameRepository.get(currentTab.id);

    if (!currentCustomName) {
      const originalTabName = await this.tabsService.getTabName(currentTab.id);
      await this.originalNameRepository.save(currentTab.id, originalTabName);
    }

    await this.customNameRepository.save(currentTab.id, name);

    const updatedName: string = await this.customNameRepository.get(currentTab.id);
    await this.tabsService.setTabName(currentTab.id, updatedName);
    return updatedName;
  }

  async resetTabCustomName(tabId: string): Promise<void> {
    const customName: string = await this.customNameRepository.get(tabId);
    if (!customName) return;

    const originalTabName = await this.tabsService.getTabName(tabId);
    if (customName === originalTabName) return;

    await this.originalNameRepository.save(tabId, originalTabName);

    await this.tabsService.setTabName(tabId, customName);
  }
}
