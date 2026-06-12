import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

import type { SetCheckpointUseCases } from "../../../use-cases/set-checkpoint-use-cases";

export class OnTabPinSetCheckpoint implements TabEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "on-tab-pin-set-checkpoint";
  description = t("browser_events.on_tab_pin_set_checkpoint");
  async command(tabId: string): Promise<void> {
    await this.setCheckpointUseCases.setTabCheckpointIfUnset(tabId);
  }
}
