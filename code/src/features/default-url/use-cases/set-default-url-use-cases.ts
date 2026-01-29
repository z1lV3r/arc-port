import type { TabsService } from "../domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class SetDefaultUrlUseCases {

  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: TabsService,
    defaultUrlRepository: DefaultUrlRepository,
  ) {
    this.tabsService = tabsService;
    this.defaultUrlRepository = defaultUrlRepository;
  }

  async setCurrentTabDefaultUrl(): Promise<string> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    return await this.setTabDefaultUrl(currentTab);
  }

  async setTabDefaultUrlIfUnsetByTabId(tabId: string): Promise<string> {
    const tab: Tab = await this.tabsService.getTab(tabId);
    const defaultUrl: string = await this.defaultUrlRepository.get(tab.id);
    if (defaultUrl) {
      return defaultUrl;
    }
    return await this.setTabDefaultUrl(tab);
  }

  private async setTabDefaultUrl(tab: Tab): Promise<string> {
    if (!tab.url) {
      return "";
    }
    await this.defaultUrlRepository.save(tab.id, tab.url);
    const defaultUrl: string = await this.defaultUrlRepository.get(tab.id);
    return defaultUrl;
  }

}
