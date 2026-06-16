import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;

  private readonly settingsPrefix: string = "setting-";
  private readonly showContextMenuKey: string =
    this.settingsPrefix + "show-context-menu";
  private readonly showContextMenuDefaultValue: boolean = true;
  private readonly extensionActionKey: string = this.settingsPrefix + "action";
  private readonly extensionActionDefaultValue: string = "on-click-show-pop-up";

  constructor(
    settingsRepository: SettingsRepository,
  ) {
    this.settingsRepository = settingsRepository;
  }

  async getShowContextMenu(): Promise<boolean> {
    return (await this.settingsRepository.getOrDefault(
      this.showContextMenuKey,
      this.showContextMenuDefaultValue,
    )) as boolean;
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
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

  async setExtensionAction(extensionActionName: string): Promise<void> {
    await this.settingsRepository.set(this.extensionActionKey, extensionActionName);
  }

  async resetExtensionAction(): Promise<void> {
    this.setExtensionAction(this.extensionActionDefaultValue);
  }
}
