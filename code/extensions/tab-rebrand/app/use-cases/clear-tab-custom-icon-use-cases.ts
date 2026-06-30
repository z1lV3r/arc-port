import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { OriginalTabInformationService } from "../domain/interfaces/original-tab-information-service.ts";
import type { CustomIconRepository } from "../domain/interfaces/custom-icon-repository.ts";
import type { OriginalIconRepository } from "../domain/interfaces/original-icon-repository.ts";

export class ClearTabCustomIconUseCases {
  private tabsService: BrowserTabsService;
  private originalTabInformationService: OriginalTabInformationService;
  private customIconRepository: CustomIconRepository;
  private originalIconRepository: OriginalIconRepository;

  constructor(
    tabsService: BrowserTabsService,
    customIconRepository: CustomIconRepository,
    originalIconRepository: OriginalIconRepository,
    originalTabInformationService: OriginalTabInformationService,
  ) {
    this.tabsService = tabsService;
    this.customIconRepository = customIconRepository;
    this.originalIconRepository = originalIconRepository;
    this.originalTabInformationService = originalTabInformationService;
  }

  async clearCurrentTabCustomIcon(): Promise<void> {
    const currentTab = await this.tabsService.getCurrentTab();
    await this.clearTabCustomIcon(currentTab.id);
  }

  async clearTabCustomIcon(tabId: string): Promise<void> {
    await this.customIconRepository.delete(tabId);
    try {
      let originalIcon = await this.originalIconRepository.get(tabId);
      if (!originalIcon) {
        originalIcon = await this.originalTabInformationService.getOriginalIcon(tabId);
      }
      if (await this.tabsService.exists(tabId)) {
        await this.tabsService.setTabIcon(tabId, originalIcon);
      }
    } catch (error) {
      console.error("Error clearing tab custom icon:", error);
    } finally {
      await this.originalIconRepository.delete(tabId);
    }
  }
}
