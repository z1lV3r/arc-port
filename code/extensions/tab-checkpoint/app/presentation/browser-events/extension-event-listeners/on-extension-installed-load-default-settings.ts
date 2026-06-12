import type { SettingsUseCases } from "@/app/use-cases/settings-use-cases";

import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";

export class OnExtensionInstalledLoadDefaultSettings implements ExtensionListener {
  private readonly settingsUseCases: SettingsUseCases;

  constructor(settingsUseCases: SettingsUseCases) {
    this.settingsUseCases = settingsUseCases;
  }

  name = "on-extension-installed-load-default-settings";
  description = t("browser_events.on_extension_installed_load_default_settings");
  command = async () => {
    const showContextMenu = await this.settingsUseCases.getShowContextMenu();
    await this.settingsUseCases.setShowContextMenu(showContextMenu);
  };
}
