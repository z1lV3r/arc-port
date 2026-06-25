import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

import type { ResetTabToCheckpointUseCases } from "../../../use-cases/reset-tab-to-checkpoint-use-cases.js";

export class ResetOrCloseCurrentTabToCheckpointMessageEventListener implements MessageEventListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "reset-or-close-current-tab-to-checkpoint-message-event-listener";
  description = t("messages.reset_or_close_current_tab_to_checkpoint");

  async command(
    _request: any,
    _sender: any,
    sendResponse: (response: any) => void,
  ): Promise<void> {
    await this.resetTabToCheckpointUseCases.resetOrCloseCurrentTabToCheckpoint();
    sendResponse({ success: true });
  }
}
