import type { ExtensionActionSettingUseCases } from "../../../use-cases/extension-action-setting-use-cases";
import type { ShowContextMenuSettingUseCases } from "../../../use-cases/show-context-menu-setting-use-cases";

import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";

export class OnExtensionInstalledLoadDefaultSettings implements ExtensionListener {
  private readonly showContextMenuSettingUseCases: ShowContextMenuSettingUseCases;
  private readonly extensionActionSettingUseCases: ExtensionActionSettingUseCases;

  constructor(
    showContextMenuSettingUseCases: ShowContextMenuSettingUseCases,
    extensionActionSettingUseCases: ExtensionActionSettingUseCases,
  ) {
    this.showContextMenuSettingUseCases = showContextMenuSettingUseCases;
    this.extensionActionSettingUseCases = extensionActionSettingUseCases;
  }

  name = "on-extension-installed-load-default-settings";
  description = t(
    "browser_events.on_extension_installed_load_default_settings",
  );
  command = async () => {
    const showContextMenu =
      await this.showContextMenuSettingUseCases.getShowContextMenu();
    await this.showContextMenuSettingUseCases.setShowContextMenu(
      showContextMenu,
    );

    const extensionAction =
      await this.extensionActionSettingUseCases.getExtensionAction();
    await this.extensionActionSettingUseCases.setExtensionAction(
      extensionAction,
    );
  };
}
