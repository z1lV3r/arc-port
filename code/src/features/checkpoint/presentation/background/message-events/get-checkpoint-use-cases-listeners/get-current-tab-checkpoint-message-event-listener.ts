import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { GetCheckpointUseCases } from "@/features/checkpoint/use-cases/get-checkpoint-use-cases";

export class GetCurrentTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly getCheckpointUseCases: GetCheckpointUseCases;

  constructor(getCheckpointUseCases: GetCheckpointUseCases) {
    this.getCheckpointUseCases = getCheckpointUseCases;
  }

  name = "get-current-tab-checkpoint-message-event-listener";
  description = "Get current tab checkpoint message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const url = await this.getCheckpointUseCases.getCurrentTabCheckpoint();
    sendResponse({ success: true, data: url });
  }
}
