import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

import type { OpenPopUpUseCases } from "../../use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomIconShortcutListener implements ShortcutListener {
  private readonly openPopUpUseCases: OpenPopUpUseCases;

  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "shortcut-open-tab-rebrand-ui-focus-custom-icon";
  description = "__MSG_shortcuts_open_tab_rebrand_ui_focus_custom_icon__";
  key = {
    default: "Alt+Shift+I",
    mac: "Option+Shift+I",
  };

  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomIcon();
  };
}
