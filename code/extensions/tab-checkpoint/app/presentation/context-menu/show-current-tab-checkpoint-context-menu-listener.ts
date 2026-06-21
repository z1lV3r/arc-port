import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

import type { ShowCheckpointUseCases } from "../../use-cases/show-checkpoint-use-cases";

export class ShowCurrentTabCheckpointContextMenuListener implements ContextMenuListener {
  private readonly showCheckpointUseCases: ShowCheckpointUseCases;

  constructor(showCheckpointUseCases: ShowCheckpointUseCases) {
    this.showCheckpointUseCases = showCheckpointUseCases;
  }

  name = "context-menu-show-current-tab-checkpoint";
  description = t("context_menu.show_current_tab_checkpoint");

  command = async () => {
    await this.showCheckpointUseCases.showCurrentTabCheckpoint();
  };
}
