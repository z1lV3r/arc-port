import type { TabsService } from "./interfaces/tabs-service";
import type { DefaultUrlRepository } from "./interfaces/default-url-repository";
import type { BrowserService } from "./interfaces/browser-service";
import { Tab } from "./models/tab";

export class DefaultUrlUseCases {
  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;
  private browserService: BrowserService;

  constructor(
    tabsService: TabsService,
    defaultUrlRepository: DefaultUrlRepository,
    browserService: BrowserService,
  ) {
    this.tabsService = tabsService;
    this.defaultUrlRepository = defaultUrlRepository;
    this.browserService = browserService;
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
    await this.browserService.loadPage(defaultUrl);
  }
}
