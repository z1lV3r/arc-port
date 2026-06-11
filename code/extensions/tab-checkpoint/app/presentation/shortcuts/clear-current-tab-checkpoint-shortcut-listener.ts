import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

import type { ClearCheckpointUseCases } from "../../use-cases/clear-checkpoint-use-cases";

export class ClearCurrentTabCheckpointShortcutListener implements ShortcutListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "shortcut-clear-current-tab-checkpoint";
  description = "Clear current tab checkpoint";
  key = {
    default: "Alt+Shift+K",
    mac: "Option+Shift+K",
  };

  command = async () => {
    await this.clearCheckpointUseCases.clearCurrentTabCheckpoint();
  };
}
