import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { OriginalTabInformationService } from "../domain/interfaces/original-tab-information-service.ts";
import type { CustomNameRepository } from "../domain/interfaces/custom-name-repository.ts";
import type { OriginalNameRepository } from "../domain/interfaces/original-name-repository.ts";

export class ClearTabCustomNameUseCases {
  private tabsService: BrowserTabsService;
  private originalTabInformationService: OriginalTabInformationService;
  private customNameRepository: CustomNameRepository;
  private originalNameRepository: OriginalNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    originalTabInformationService: OriginalTabInformationService,
    customNameRepository: CustomNameRepository,
    originalNameRepository: OriginalNameRepository,
  ) {
    this.tabsService = tabsService;
    this.originalTabInformationService = originalTabInformationService;
    this.customNameRepository = customNameRepository;
    this.originalNameRepository = originalNameRepository;
  }

  async clearCurrentTabCustomName(): Promise<void> {
    const currentTab = await this.tabsService.getCurrentTab();
    await this.clearTabCustomName(currentTab.id);
  }

  async clearTabCustomName(tabId: string): Promise<void> {
    await this.customNameRepository.delete(tabId);
    try {
      let originalName = await this.originalNameRepository.get(tabId);
      if (!originalName) {
        originalName = await this.originalTabInformationService.getOriginalName(tabId);
      }
      if (await this.tabsService.exists(tabId)) {
        await this.tabsService.setTabName(tabId, originalName);
      }
    } catch (error) {
      console.error("Error clearing tab custom name:", error);
    } finally {
      await this.originalNameRepository.delete(tabId);
    }
  }
}
