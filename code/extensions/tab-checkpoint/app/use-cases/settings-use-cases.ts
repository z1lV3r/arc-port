import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;
  private readonly contextMenuListeners: ContextMenuListener[];
  private readonly browserContextMenuService: BrowserContextMenuService;

  private readonly settingsPrefix: string = "settings-checkpoint-";
  private readonly showPopUpKey: string = this.settingsPrefix + "show-pop-up";
  private readonly showPopUpDefaultValue: boolean = true;
  private readonly showContextMenuKey: string =
    this.settingsPrefix + "show-context-menu";
  private readonly showContextMenuDefaultValue: boolean = true;

  constructor(
    settingsRepository: SettingsRepository,
    browserContextMenuService: BrowserContextMenuService,
    contextMenuListeners: ContextMenuListener[] = [],
  ) {
    this.settingsRepository = settingsRepository;
    this.browserContextMenuService = browserContextMenuService;
    this.contextMenuListeners = contextMenuListeners;
  }

  async getShowPopUp(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(
      this.showPopUpKey,
      this.showPopUpDefaultValue,
    );
  }

  async setShowPopUp(showPopUp: boolean): Promise<void> {
    this.settingsRepository.set(this.showPopUpKey, showPopUp);
  }

  async resetShowPopUp(): Promise<void> {
    this.setShowPopUp(this.showPopUpDefaultValue);
  }

  async getShowContextMenu(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(
      this.showContextMenuKey,
      this.showContextMenuDefaultValue,
    );
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
    if (showContextMenu) {
      this.browserContextMenuService.createFeatureContextMenus(
        "Checkpoint",
        this.contextMenuListeners,
      );
    } else {
      this.browserContextMenuService.removeFeatureContextMenus(
        "Checkpoint",
        this.contextMenuListeners,
      );
    }
    await this.settingsRepository.set(this.showContextMenuKey, showContextMenu);
  }

  async resetShowContextMenu(): Promise<void> {
    this.setShowContextMenu(this.showContextMenuDefaultValue);
  }
}
