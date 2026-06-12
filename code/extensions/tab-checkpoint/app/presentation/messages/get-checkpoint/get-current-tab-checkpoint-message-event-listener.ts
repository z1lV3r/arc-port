import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

import type { GetCheckpointUseCases } from "../../../use-cases/get-checkpoint-use-cases.js";

export class GetCurrentTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly getCheckpointUseCases: GetCheckpointUseCases;

  constructor(getCheckpointUseCases: GetCheckpointUseCases) {
    this.getCheckpointUseCases = getCheckpointUseCases;
  }

  name = "get-current-tab-checkpoint-message-event-listener";
  description = t("messages.get_current_tab_checkpoint");

  async command(
    _request: any,
    _sender: any,
    sendResponse: (response: any) => void,
  ): Promise<void> {
    const url = await this.getCheckpointUseCases.getCurrentTabCheckpoint();
    sendResponse({ success: true, data: url });
  }
}
