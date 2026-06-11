import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

import type { ResetTabToCheckpointUseCases } from "../../use-cases/reset-tab-to-checkpoint-use-cases";

export class ResetCurrentTabToCheckpointContextMenuListener implements ContextMenuListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "context-menu-reset-current-tab-to-checkpoint";
  description = "Reset current tab to checkpoint";

  command = async () => {
    await this.resetTabToCheckpointUseCases.resetCurrentTabToCheckpoint();
  };
}
