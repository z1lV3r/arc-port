import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import type { SetCheckpointUseCases } from "../../../use-cases/set-checkpoint-use-cases";

export class OnTabCreatePinnedSetCheckpoint implements TabEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "on-tab-create-pinned-set-checkpoint";
  description = "Set tab checkpoint if unset by tab id";
  async command(tabId: string): Promise<void> {
    await this.setCheckpointUseCases.setTabCheckpointIfUnset(tabId);
  }
}