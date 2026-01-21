import { ChromeTabsService } from "./infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "./infrastructure/chrome-storage-default-url-repository";
import { DefaultUrlUseCases } from "./domain/default-url-use-cases";
import type { TabsService } from "./domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "./domain/interfaces/default-url-repository";

export class DefaultUrlDependencyProvider {
  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;
  private defaultUrlUseCases: DefaultUrlUseCases;

  constructor() {
    const userAgent = navigator.userAgent.toLowerCase();
    const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

    if (browserName === "chrome") {
      this.tabsService = new ChromeTabsService();
      this.defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
    } else {
      throw new Error("Unsupported browser");
    }

    this.defaultUrlUseCases = new DefaultUrlUseCases(
      this.tabsService,
      this.defaultUrlRepository,
    );

    return this;
  }

  getTabsService(): TabsService {
    return this.tabsService;
  }

  getDefaultUrlRepository(): DefaultUrlRepository {
    return this.defaultUrlRepository;
  }

  getDefaultUrlUseCases(): DefaultUrlUseCases {
    return this.defaultUrlUseCases;
  }
}
