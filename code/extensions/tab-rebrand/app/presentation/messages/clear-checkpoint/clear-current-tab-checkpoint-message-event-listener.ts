import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

import type { ClearCheckpointUseCases } from "../../../use-cases/clear-checkpoint-use-cases.js";

export class ClearCurrentTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "clear-current-tab-checkpoint-message-event-listener";
  description = t("messages.clear_current_tab_checkpoint");

  async command(
    _request: any,
    _sender: any,
    sendResponse: (response: any) => void,
  ): Promise<void> {
    await this.clearCheckpointUseCases.clearCurrentTabCheckpoint();
    sendResponse({ success: true });
  }
}
