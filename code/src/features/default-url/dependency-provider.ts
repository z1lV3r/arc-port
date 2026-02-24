import { ChromeTabsService } from "./infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "./infrastructure/chrome-storage-default-url-repository";
import { SetDefaultUrlUseCases } from "./use-cases/set-default-url-use-cases";
import { ResetTabToDefaultUrlUseCases } from "./use-cases/reset-tab-to-default-url-use-cases";
import { GetDefaultUrlUseCases } from "./use-cases/get-default-url-use-cases";
import { ClearDefaultUrlUseCases } from "./use-cases/clear-default-url-use-cases";
import type { TabsService } from "./domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "./domain/interfaces/default-url-repository";
import { ChromeShortcutSettingsService } from "@/shared/infrastructure/chrome-shortcut-settings-service";
import type { ShortcutSettingsService } from "@/shared/domain/interfaces/shortcut-settings-service";

export class DefaultUrlDependencyProvider {
  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;
  private setDefaultUrlUseCases: SetDefaultUrlUseCases;
  private resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  private getDefaultUrlUseCases: GetDefaultUrlUseCases;
  private clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  private shortcutSettingsService: ShortcutSettingsService;

  constructor() {
    const userAgent = navigator.userAgent.toLowerCase();
    const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

    if (browserName === "chrome") {
      this.tabsService = new ChromeTabsService();
      this.defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
    } else {
      throw new Error("Unsupported browser");
    }

    this.setDefaultUrlUseCases = new SetDefaultUrlUseCases(
      this.tabsService,
      this.defaultUrlRepository,
    );

    this.resetTabToDefaultUrlUseCases = new ResetTabToDefaultUrlUseCases(
      this.tabsService,
      this.defaultUrlRepository,
    );

    this.getDefaultUrlUseCases = new GetDefaultUrlUseCases(
      this.tabsService,
      this.defaultUrlRepository,
    );

    this.clearDefaultUrlUseCases = new ClearDefaultUrlUseCases(
      this.tabsService,
      this.defaultUrlRepository,
    );

    this.shortcutSettingsService = new ChromeShortcutSettingsService(); 

    return this;
  }

  getTabsService(): TabsService {
    return this.tabsService;
  }

  getDefaultUrlRepository(): DefaultUrlRepository {
    return this.defaultUrlRepository;
  }

  getSetDefaultUrlUseCases(): SetDefaultUrlUseCases {
    return this.setDefaultUrlUseCases;
  }

  getResetTabToDefaultUrlUseCases(): ResetTabToDefaultUrlUseCases {
    return this.resetTabToDefaultUrlUseCases;
  }

  getGetDefaultUrlUseCases(): GetDefaultUrlUseCases {
    return this.getDefaultUrlUseCases;
  }

  getClearDefaultUrlUseCases(): ClearDefaultUrlUseCases {
    return this.clearDefaultUrlUseCases;
  }

  getShortcutSettingsService(): ShortcutSettingsService {
    return this.shortcutSettingsService;
  }
}
