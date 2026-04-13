import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { ClearCheckpointUseCases } from "@/features/checkpoint/use-cases/clear-checkpoint-use-cases";

export class OnTabCloseRemoveCheckpoint implements TabEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "on-tab-close-remove-checkpoint";
  description = "Remove checkpoint when tab is closed";
  async command(tabId: string): Promise<void> {
    await this.clearCheckpointUseCases.clearTabCheckpoint(tabId);
  }
}
