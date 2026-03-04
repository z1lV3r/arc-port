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
import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";
import { ChromeStorageSettingsRepository } from "@/shared/infrastructure/chrome-storage-settings-repository";
import { SettingsUseCases } from "./use-cases/settings-use-cases";
import { ResetCurrentTabToDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/reset-current-tab-to-default-url-context-menu-listener";
import { SetCurrentTabDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/set-current-tab-default-url-context-menu-listener";
import { ClearCurrentTabDefaultUrlContextMenuListener } from "./presentation/background/context-menu-listeners/clear-current-tab-default-url-context-menu-listener";
import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/set-current-tab-default-url-shortcut-listener";
import { ClearCurrentTabDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/clear-current-tab-default-url-shortcut-listener";
import { ResetCurrentTabToDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/reset-current-tab-to-default-url-shortcut-listener";
import { ResetOrCloseCurrentTabToDefaultUrlShortcutListener } from "./presentation/background/shortcut-listeners/reset-or-close-current-tab-to-default-url-shortcut-listener";
import { OnTabCloseRemoveDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-close-delete-default-url";
import { OnTabPinSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-pin-set-default-url";
import { OnTabSetToGroupSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-set-to-group-set-default-url";
import { OnTabCreatePinnedSetDefaultUrl } from "./presentation/background/tab-event-listeners/on-tab-create-pinned-set-default-url";
import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";

export class DefaultUrlDependencyProvider {
  private tabsService: TabsService;
  private defaultUrlRepository: DefaultUrlRepository;
  private setDefaultUrlUseCases: SetDefaultUrlUseCases;
  private resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  private getDefaultUrlUseCases: GetDefaultUrlUseCases;
  private clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  private shortcutSettingsService: ShortcutSettingsService;
  private settingsRepository: SettingsRepository;
  private settingsUseCases: SettingsUseCases;
  private contextMenuListeners: ContextMenuListener[];
  private shortcutListeners: ShortcutListener[];
  private onCloseTabEventListeners: TabEventListener[];
  private onUpdateTabEventListeners: TabEventListener[];
  private onCreateTabEventListeners: TabEventListener[];

  constructor() {
    const userAgent = navigator.userAgent.toLowerCase();
    const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

    if (browserName === "chrome") {
      this.tabsService = new ChromeTabsService();
      this.defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
      this.shortcutSettingsService = new ChromeShortcutSettingsService(); 
      this.settingsRepository = new ChromeStorageSettingsRepository();
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

    this.contextMenuListeners = [
      new SetCurrentTabDefaultUrlContextMenuListener(this.setDefaultUrlUseCases),
      new ResetCurrentTabToDefaultUrlContextMenuListener(this.resetTabToDefaultUrlUseCases),
      new ClearCurrentTabDefaultUrlContextMenuListener(this.clearDefaultUrlUseCases),
    ];

    this.shortcutListeners = [
      new SetCurrentTabDefaultUrlShortcutListener(this.setDefaultUrlUseCases),
      new ClearCurrentTabDefaultUrlShortcutListener(this.clearDefaultUrlUseCases),
      new ResetCurrentTabToDefaultUrlShortcutListener(this.resetTabToDefaultUrlUseCases),
      new ResetOrCloseCurrentTabToDefaultUrlShortcutListener(this.resetTabToDefaultUrlUseCases),
    ];

    this.onCloseTabEventListeners = [
      new OnTabCloseRemoveDefaultUrl(this.clearDefaultUrlUseCases),
    ];

    this.onUpdateTabEventListeners = [
      new OnTabPinSetDefaultUrl(this.setDefaultUrlUseCases),
      new OnTabSetToGroupSetDefaultUrl(this.setDefaultUrlUseCases),
    ];

    this.onCreateTabEventListeners = [
      new OnTabCreatePinnedSetDefaultUrl(this.setDefaultUrlUseCases),
    ];

    this.settingsUseCases = new SettingsUseCases(
      this.settingsRepository,
      this.contextMenuListeners,
    );

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

  getSettingsRepository(): SettingsRepository {
    return this.settingsRepository;
  }

  getSettingsUseCases(): SettingsUseCases {
    return this.settingsUseCases;
  }

  getContextMenuListeners(): ContextMenuListener[] {
    return this.contextMenuListeners;
  }

  getShortcutListeners(): ShortcutListener[] {
    return this.shortcutListeners;
  }

  getOnCloseTabEventListeners(): TabEventListener[] {
    return this.onCloseTabEventListeners;
  }

  getOnUpdateTabEventListeners(): TabEventListener[] {
    return this.onUpdateTabEventListeners;
  }

  getOnCreateTabEventListeners(): TabEventListener[] {
    return this.onCreateTabEventListeners;
  }
}
