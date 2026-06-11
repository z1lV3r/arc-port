import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { SetCheckpointUseCases } from "../../../use-cases/set-checkpoint-use-cases.js";

export class SetTabCheckpointIfUnsetMessageEventListener implements MessageEventListener {
  private readonly setCheckpointUseCases: SetCheckpointUseCases;

  constructor(setCheckpointUseCases: SetCheckpointUseCases) {
    this.setCheckpointUseCases = setCheckpointUseCases;
  }

  name = "set-tab-checkpoint-if-unset-message-event-listener";
  description = "Set tab checkpoint if unset message event listener";

  async command(
    request: any,
    _sender: any,
    sendResponse: (response: any) => void,
  ): Promise<void> {
    const url = await this.setCheckpointUseCases.setTabCheckpointIfUnset(
      request.tabId,
    );
    sendResponse({ success: true, data: url });
  }
}
