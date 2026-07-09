import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { CustomNameRepository } from "../domain/interfaces/custom-name-repository.ts";

export class GetTabCustomNameUseCases {
  private tabsService: BrowserTabsService;
  private customNameRepository: CustomNameRepository;

  constructor(
    tabsService: BrowserTabsService,
    customNameRepository: CustomNameRepository,
  ) {
    this.tabsService = tabsService;
    this.customNameRepository = customNameRepository;
  }

  async getCurrentTabCustomName(): Promise<string> {
    const currentTab = await this.tabsService.getCurrentTab();
    return await this.customNameRepository.get(currentTab.id);
  }
}
