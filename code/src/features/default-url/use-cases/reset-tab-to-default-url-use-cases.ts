import type { TabsService } from "../domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class ResetTabToDefaultUrlUseCases {

  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: TabsService,
    defaultUrlRepository: DefaultUrlRepository,
  ) {
    this.tabsService = tabsService;
    this.defaultUrlRepository = defaultUrlRepository;
  }

  async resetCurrentTabToDefaultUrl(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );
    await this.resetTabToDefaultUrl(currentTab, defaultUrl);
  }

  async resetOrCloseCurrentTabToDefaultUrl(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );

    if (!defaultUrl || defaultUrl === currentTab.url) {
      await this.tabsService.closeTab(currentTab.id);
    } else {
      await this.resetTabToDefaultUrl(currentTab, defaultUrl);
    }
  }

  private async resetTabToDefaultUrl(tab: Tab, defaultUrl: string): Promise<void> {
    if (defaultUrl) {
      const createTabPromise = this.tabsService.createTab(defaultUrl, tab.index);
      const closeTabPromise = this.tabsService.closeTab(tab.id);
      const newTab: Tab = await createTabPromise;
      await this.defaultUrlRepository.save(newTab.id, defaultUrl);
      await closeTabPromise;
    }
  }

}
