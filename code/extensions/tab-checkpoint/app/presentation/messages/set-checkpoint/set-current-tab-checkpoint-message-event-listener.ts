import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

import type { SetCheckpointUseCases } from "../../../use-cases/set-checkpoint-use-cases.js";

export class SetCurrentTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "set-current-tab-checkpoint-message-event-listener";
  description = "Set current tab checkpoint message event listener";

  async command(
    _request: any,
    _sender: any,
    sendResponse: (response: any) => void,
  ): Promise<void> {
    const url = await this.setCheckpointUseCases.setCurrentTabCheckpoint();
    sendResponse({ success: true, data: url });
  }
}
