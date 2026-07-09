import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

import type { ClearCheckpointUseCases } from "../../use-cases/clear-checkpoint-use-cases";

export class ClearCurrentTabCheckpointContextMenuListener implements ContextMenuListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "context-menu-clear-current-tab-checkpoint";
  description = t("context_menu.clear_current_tab_checkpoint");

  command = async () => {
    await this.clearCheckpointUseCases.clearCurrentTabCheckpoint();
  };
}
