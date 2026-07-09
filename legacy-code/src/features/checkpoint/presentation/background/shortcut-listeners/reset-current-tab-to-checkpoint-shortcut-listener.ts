import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { ResetTabToCheckpointUseCases } from "@/features/checkpoint/use-cases/reset-tab-to-checkpoint-use-cases";

export class ResetCurrentTabToCheckpointShortcutListener implements ShortcutListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }
  name = "shortcut-reset-current-tab-to-checkpoint";
  description = "Reset current tab to checkpoint";
  key = {
    default: "Alt+Shift+R",
    mac: "Option+Shift+R",
  };
  command = async () => {
    await this.resetTabToCheckpointUseCases.resetCurrentTabToCheckpoint();
  };
}
