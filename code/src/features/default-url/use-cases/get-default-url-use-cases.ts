import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class GetDefaultUrlUseCases {

  private tabsService: BrowserTabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: BrowserTabsService,
    defaultUrlRepository: DefaultUrlRepository,
  ) {
    this.tabsService = tabsService;
    this.defaultUrlRepository = defaultUrlRepository;
  }

  async getCurrentTabDefaultUrl(): Promise<string> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const defaultUrl: string = await this.defaultUrlRepository.get(
      currentTab.id,
    );
    return defaultUrl;
  }

}
