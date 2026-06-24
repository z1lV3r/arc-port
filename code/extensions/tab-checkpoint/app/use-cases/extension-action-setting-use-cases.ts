import {
  EXTENSION_ACTION_SETTING_DEFAULT,
  EXTENSION_ACTION_SETTING_NAME,
} from "../presentation/browser-events/settings-event-listeners/extension-action-setting.ts";

import type { SettingsRepository } from "@repo/shared/domain/interfaces/settings-repository";

export class ExtensionActionSettingUseCases {
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  async getExtensionAction(): Promise<string> {
    return (await this.settingsRepository.getOrDefault(
      EXTENSION_ACTION_SETTING_NAME,
      EXTENSION_ACTION_SETTING_DEFAULT,
    )) as string;
  }

  async setExtensionAction(extensionActionName: string): Promise<void> {
    await this.settingsRepository.set(
      EXTENSION_ACTION_SETTING_NAME,
      extensionActionName,
    );
  }

  async resetExtensionAction(): Promise<void> {
    this.setExtensionAction(EXTENSION_ACTION_SETTING_DEFAULT);
  }
}
