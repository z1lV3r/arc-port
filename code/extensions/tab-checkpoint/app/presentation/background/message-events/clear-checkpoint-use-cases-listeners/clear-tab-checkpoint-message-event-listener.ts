import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { ClearCheckpointUseCases } from "../../../../use-cases/clear-checkpoint-use-cases";

export class ClearTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "clear-tab-checkpoint-message-event-listener";
  description = "Clear tab checkpoint message event listener";

  async command(request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    await this.clearCheckpointUseCases.clearTabCheckpoint(request.tabId);
    sendResponse({ success: true });
  }
}
