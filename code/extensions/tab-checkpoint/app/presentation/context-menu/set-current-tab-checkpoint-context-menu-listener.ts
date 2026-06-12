import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

import type { SetCheckpointUseCases } from "../../use-cases/set-checkpoint-use-cases";

export class SetCurrentTabCheckpointContextMenuListener implements ContextMenuListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "context-menu-set-current-tab-checkpoint";
  description = t("context_menu.set_current_tab_checkpoint");

  command = async () => {
    await this.setCheckpointUseCases.setCurrentTabCheckpoint();
  };
}
