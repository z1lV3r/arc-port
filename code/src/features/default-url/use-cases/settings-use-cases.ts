import type { BrowserContextMenuService } from "@/shared/domain/interfaces/browser-context-menu-service";
import type { BrowserExtensionService } from "@/shared/domain/interfaces/browser-extension-service";
import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";
import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;
  private readonly contextMenuListeners: ContextMenuListener[];
  private readonly browserContextMenuService: BrowserContextMenuService;
  private readonly browserExtensionService: BrowserExtensionService;

  private readonly settingsPrefix: string = "settings-default-url-";
  private readonly showPopUpKey: string = this.settingsPrefix + "show-pop-up";
  private readonly showPopUpDefaultValue: boolean = true;
  private readonly showContextMenuKey: string = this.settingsPrefix + "show-context-menu";
  private readonly showContextMenuDefaultValue: boolean = true;

  constructor(
    settingsRepository: SettingsRepository,
    browserContextMenuService: BrowserContextMenuService,
    browserExtensionService: BrowserExtensionService,
    contextMenuListeners: ContextMenuListener[] = [],
  ) {
    this.settingsRepository = settingsRepository;
    this.browserContextMenuService = browserContextMenuService;
    this.browserExtensionService = browserExtensionService;
    this.contextMenuListeners = contextMenuListeners;

    //if extension Installed/reinstalled re evaluate context menus creation
    this.getShowContextMenu().then((showContextMenu) => {
      this.browserExtensionService.onInstalled(async () => {
        this.setShowContextMenu(showContextMenu);
      });
    });
  }

  async getShowPopUp(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(this.showPopUpKey, this.showPopUpDefaultValue);
  }

  async setShowPopUp(showPopUp: boolean): Promise<void> {
    this.settingsRepository.set(this.showPopUpKey, showPopUp);
  }

  async resetShowPopUp(): Promise<void> {
    this.setShowPopUp(this.showPopUpDefaultValue);
  }

  async getShowContextMenu(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(this.showContextMenuKey, this.showContextMenuDefaultValue);
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
    if (showContextMenu) {
      this.browserContextMenuService.createFeatureContextMenus("Default URL", this.contextMenuListeners);
    } else {
      this.browserContextMenuService.removeFeatureContextMenus("Default URL", this.contextMenuListeners);
    }
    await this.settingsRepository.set(this.showContextMenuKey, showContextMenu);
  }

  async resetShowContextMenu(): Promise<void> {
    this.setShowContextMenu(this.showContextMenuDefaultValue);
  }

}