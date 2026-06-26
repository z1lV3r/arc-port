import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { CustomIconRepository } from "../domain/interfaces/custom-icon-repository.ts";

export class GetTabCustomIconUseCases {
  private tabsService: BrowserTabsService;
  private customIconRepository: CustomIconRepository;

  constructor(
    tabsService: BrowserTabsService,
    customIconRepository: CustomIconRepository,
  ) {
    this.tabsService = tabsService;
    this.customIconRepository = customIconRepository;
  }

  async getCurrentTabCustomIcon(): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    return await this.customIconRepository.get(currentTab.id);
  }
}
