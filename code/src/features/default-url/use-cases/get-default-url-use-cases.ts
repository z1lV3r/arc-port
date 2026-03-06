import type { TabsService } from "@/shared/domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";
import { Tab } from "../domain/models/tab";

export class GetDefaultUrlUseCases {

  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;

  constructor(
    tabsService: TabsService,
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
