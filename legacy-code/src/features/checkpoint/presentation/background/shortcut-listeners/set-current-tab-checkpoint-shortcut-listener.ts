import type { SetCheckpointUseCases } from "@/features/checkpoint/use-cases/set-checkpoint-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";

export class SetCurrentTabCheckpointShortcutListener implements ShortcutListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }
  name = "shortcut-set-current-tab-checkpoint";
  description = "Set current tab checkpoint";
  key = {
    default: "Alt+Shift+S",
    mac: "Option+Shift+S",
  };
  command = async () => {
    await this.setCheckpointUseCases.setCurrentTabCheckpoint();
  };
}
