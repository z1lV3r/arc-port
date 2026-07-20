import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

import type { SetCheckpointUseCases } from "../../use-cases/set-checkpoint-use-cases";

export class SetCurrentTabCheckpointShortcutListener implements ShortcutListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "shortcut-set-current-tab-checkpoint";
  description = "__MSG_shortcuts_set_current_tab_checkpoint__";
  key = {
    default: "Alt+Shift+S",
    mac: "Option+Shift+S",
  };

  command = async () => {
    await this.setCheckpointUseCases.setCurrentTabCheckpoint();
  };
}
