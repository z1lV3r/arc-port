import type { ExtensionListener } from "@/shared/domain/models/extension-listener";
import type { SettingsUseCases } from "@/features/tab-rebrand/use-cases/settings-use-cases";

export class OnExtensionInstalledLoadDefaultSettings implements ExtensionListener {
  private readonly settingsUseCases: SettingsUseCases;

  constructor(settingsUseCases: SettingsUseCases) {
    this.settingsUseCases = settingsUseCases;
  }

  name = "on-extension-installed-load-tab-rebrand-default-settings";
  description = "On extension installed load tab rebrand default settings";

  async command() {
    const showContextMenu = await this.settingsUseCases.getShowContextMenu();
    await this.settingsUseCases.setShowContextMenu(showContextMenu);
  }
}
