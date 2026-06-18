import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";
import { ShowContextMenuSetting } from "../presentation/browser-events/settings-event-listeners/show-context-menu-setting";
import { ExtensionActionSetting } from "../presentation/browser-events/settings-event-listeners/extension-action-setting";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;
  private readonly showContextMenuSetting: ShowContextMenuSetting;
  private readonly extensionActionSetting: ExtensionActionSetting;

  constructor(
    settingsRepository: SettingsRepository,
    [showContextMenuSetting, extensionActionSetting]: [ShowContextMenuSetting, ExtensionActionSetting]
  ) {
    this.settingsRepository = settingsRepository;
    this.showContextMenuSetting = showContextMenuSetting;
    this.extensionActionSetting = extensionActionSetting;
  }

  async getShowContextMenu(): Promise<boolean> {
    return (await this.settingsRepository.getOrDefault(
      this.showContextMenuSetting.name,
      this.showContextMenuSetting.defaultValue,
    )) as boolean;
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
    await this.settingsRepository.set(this.showContextMenuSetting.name, showContextMenu);
  }

  async resetShowContextMenu(): Promise<void> {
    this.setShowContextMenu(this.showContextMenuSetting.defaultValue);
  }

  async getExtensionAction(): Promise<string> {
    return (await this.settingsRepository.getOrDefault(
      this.extensionActionSetting.name,
      this.extensionActionSetting.defaultValue,
    )) as string;
  }

  async setExtensionAction(extensionActionName: string): Promise<void> {
    await this.settingsRepository.set(this.extensionActionSetting.name, extensionActionName);
  }

  async resetExtensionAction(): Promise<void> {
    this.setExtensionAction(this.extensionActionSetting.defaultValue);
  }
}
