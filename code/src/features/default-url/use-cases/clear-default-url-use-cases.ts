import type { TabsService } from "../domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class ClearDefaultUrlUseCases {

  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: TabsService,
    defaultUrlRepository: DefaultUrlRepository,
  ) {
    this.tabsService = tabsService;
    this.defaultUrlRepository = defaultUrlRepository;
  }

  async clearCurrentTabDefaultUrl(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    await this.clearTabDefaultUrl(currentTab.id);
  }

  async clearTabDefaultUrl(tabId: string): Promise<void> {
    await this.defaultUrlRepository.delete(tabId);
  }

}
