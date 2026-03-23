import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class ClearDefaultUrlUseCases {

  private tabsService: BrowserTabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: BrowserTabsService,
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
