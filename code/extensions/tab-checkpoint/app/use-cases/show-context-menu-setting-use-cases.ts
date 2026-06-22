import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";

export const SHOW_CONTEXT_MENU_SETTING_NAME = "setting-show-context-menu";
export const SHOW_CONTEXT_MENU_SETTING_DEFAULT = true;

export class ShowContextMenuSettingUseCases {
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  async getShowContextMenu(): Promise<boolean> {
    return (await this.settingsRepository.getOrDefault(
      SHOW_CONTEXT_MENU_SETTING_NAME,
      SHOW_CONTEXT_MENU_SETTING_DEFAULT,
    )) as boolean;
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
    await this.settingsRepository.set(SHOW_CONTEXT_MENU_SETTING_NAME, showContextMenu);
  }

  async resetShowContextMenu(): Promise<void> {
    this.setShowContextMenu(SHOW_CONTEXT_MENU_SETTING_DEFAULT);
  }
}
