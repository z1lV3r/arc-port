import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

import type { ResetTabToCheckpointUseCases } from "../../use-cases/reset-tab-to-checkpoint-use-cases";

export class ResetCurrentTabToCheckpointShortcutListener implements ShortcutListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "shortcut-reset-current-tab-to-checkpoint";
  description = "__MSG_shortcuts_reset_current_tab_to_checkpoint__";
  key = {
    default: "Alt+Shift+R",
    mac: "Option+Shift+R",
  };

  command = async () => {
    await this.resetTabToCheckpointUseCases.resetCurrentTabToCheckpoint();
  };
}
