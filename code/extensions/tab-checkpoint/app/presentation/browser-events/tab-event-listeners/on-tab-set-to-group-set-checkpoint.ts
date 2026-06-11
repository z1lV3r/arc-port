import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

import type { SetCheckpointUseCases } from "../../../use-cases/set-checkpoint-use-cases";

export class OnTabSetToGroupSetCheckpoint implements TabEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "on-tab-set-to-group-set-checkpoint";
  description = "Set tab checkpoint if unset by tab id";

  async command(tabId: string): Promise<void> {
    await this.setCheckpointUseCases.setTabCheckpointIfUnset(tabId);
  }
}
