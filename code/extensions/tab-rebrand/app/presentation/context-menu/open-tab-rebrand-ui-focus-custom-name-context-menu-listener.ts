import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

import type { OpenPopUpUseCases } from "../../use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomNameContextMenuListener implements ContextMenuListener {
  private readonly openPopUpUseCases: OpenPopUpUseCases;

  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "context-menu-open-tab-rebrand-ui-focus-custom-name";
  description = t("context_menu.open_tab_rebrand_ui_focus_custom_name");

  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomName();
  };
}
