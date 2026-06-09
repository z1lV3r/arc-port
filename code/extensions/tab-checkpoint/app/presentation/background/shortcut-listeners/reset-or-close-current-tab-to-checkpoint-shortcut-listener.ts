import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";
import type { ResetTabToCheckpointUseCases } from "../../../use-cases/reset-tab-to-checkpoint-use-cases";

export class ResetOrCloseCurrentTabToCheckpointShortcutListener
  implements ShortcutListener
{
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "shortcut-reset-or-close-current-tab-to-checkpoint";
  description = "Reset or close current tab to checkpoint";
  key = {
    default: "Alt+Shift+D",
    mac: "Option+Shift+D",
  };

  command = async () => {
    await this.resetTabToCheckpointUseCases.resetOrCloseCurrentTabToCheckpoint();
  };
}
