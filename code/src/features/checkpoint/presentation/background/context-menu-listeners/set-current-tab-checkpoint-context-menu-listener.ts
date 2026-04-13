import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { SetCheckpointUseCases } from "@/features/checkpoint/use-cases/set-checkpoint-use-cases";

export class SetCurrentTabCheckpointContextMenuListener implements ContextMenuListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }
  name = "context-menu-set-current-tab-checkpoint";
  description = "Set current tab checkpoint";
  command = async () => {
    await this.setCheckpointUseCases.setCurrentTabCheckpoint();
  }
}
