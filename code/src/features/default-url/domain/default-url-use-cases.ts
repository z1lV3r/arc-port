import type { TabsService } from "./interfaces/tabs-service";
import type { DefaultUrlRepository } from "./interfaces/default-url-repository";
import { Tab } from "./models/tab";

export class DefaultUrlUseCases {
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
    await this.defaultUrlRepository.save(currentTab.id, currentTab.url);
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );
    return defaultUrl;
  }

  async getCurrentTabDefaultUrl(): Promise<string> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );
    return defaultUrl;
  }

  async clearCurrentTabDefaultUrl(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    await this.defaultUrlRepository.delete(currentTab.id);
  }

  async resetTabToDefaultUrl(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );

    if (defaultUrl) {
      const newTab: Tab = await this.tabsService.createTab(
        defaultUrl,
        currentTab.index,
      );
      await this.defaultUrlRepository.save(newTab.id, defaultUrl);
      await this.tabsService.closeTab(currentTab.id);
    }
  }
}
