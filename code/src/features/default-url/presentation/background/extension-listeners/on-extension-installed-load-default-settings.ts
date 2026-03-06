import type { ExtensionListener } from "@/shared/domain/models/extension-listener";
import type { SettingsUseCases } from "@/features/default-url/use-cases/settings-use-cases";

export class OnExtensionInstalledLoadDefaultSettings implements ExtensionListener {
  private readonly settingsUseCases: SettingsUseCases;

  constructor(settingsUseCases: SettingsUseCases) {
    this.settingsUseCases = settingsUseCases;
  }
  name = "on-extension-installed-load-default-settings";
  description = "On extension installed load default settings";
  command = async () => {
    const showContextMenu = await this.settingsUseCases.getShowContextMenu();
    await this.settingsUseCases.setShowContextMenu(showContextMenu);
  }
}