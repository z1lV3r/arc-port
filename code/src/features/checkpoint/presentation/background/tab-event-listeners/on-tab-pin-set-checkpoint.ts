import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { SetCheckpointUseCases } from "@/features/checkpoint/use-cases/set-checkpoint-use-cases";

export class OnTabPinSetCheckpoint implements TabEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "on-tab-pin-set-checkpoint";
  description = "Set tab checkpoint if unset by tab id";
  async command(tabId: string): Promise<void> {
    await this.setCheckpointUseCases.setTabCheckpointIfUnset(tabId);
  }
}
