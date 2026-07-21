import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

import type { OpenPopUpUseCases } from "../../use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomNameShortcutListener implements ShortcutListener {
  private readonly openPopUpUseCases: OpenPopUpUseCases;

  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "shortcut-open-tab-rebrand-ui-focus-custom-name";
  description = "shortcuts.open_tab_rebrand_ui_focus_custom_name";
  key = {
    default: "Alt+Shift+E",
    mac: "Option+Shift+E",
  };

  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomName();
  };
}
