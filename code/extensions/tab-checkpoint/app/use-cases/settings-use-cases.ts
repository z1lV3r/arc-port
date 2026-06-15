import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;
  private readonly contextMenuListeners: ContextMenuListener[];
  private readonly browserContextMenuService: BrowserContextMenuService;

  private readonly settingsPrefix: string = "settings-checkpoint-";
  private readonly showContextMenuKey: string =
    this.settingsPrefix + "show-context-menu";
  private readonly showContextMenuDefaultValue: boolean = true;
  private readonly extensionActionKey: string = this.settingsPrefix + "action";
  private readonly extensionActionDefaultValue: string = "popup";

  constructor(
    settingsRepository: SettingsRepository,
    browserContextMenuService: BrowserContextMenuService,
    contextMenuListeners: ContextMenuListener[] = [],
  ) {
    this.settingsRepository = settingsRepository;
    this.browserContextMenuService = browserContextMenuService;
    this.contextMenuListeners = contextMenuListeners;
  }

  async getShowContextMenu(): Promise<boolean> {
    return (await this.settingsRepository.getOrDefault(
      this.showContextMenuKey,
      this.showContextMenuDefaultValue,
    )) as boolean;
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

  async getExtensionAction(): Promise<string> {
    return (await this.settingsRepository.getOrDefault(
      this.extensionActionKey,
      this.extensionActionDefaultValue,
    )) as string;
  }

  async setExtensionAction(extensionAction: string): Promise<void> {
    this.settingsRepository.set(this.extensionActionKey, extensionAction);
    if (extensionAction === "reset-current-tab-to-checkpoint") {
      // Set reset on click
    } else {
      // Set show popup on click
    }
  }

  async resetExtensionAction(): Promise<void> {
    this.setExtensionAction(this.extensionActionDefaultValue);
  }
}
