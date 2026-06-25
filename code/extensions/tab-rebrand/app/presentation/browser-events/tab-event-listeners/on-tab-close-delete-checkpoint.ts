import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

import type { ClearCheckpointUseCases } from "../../../use-cases/clear-checkpoint-use-cases";

export class OnTabCloseRemoveCheckpoint implements TabEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "on-tab-close-remove-checkpoint";
  description = t("browser_events.on_tab_close_remove_checkpoint");
  async command(tabId: string): Promise<void> {
    await this.clearCheckpointUseCases.clearTabCheckpoint(tabId);
  }
}
