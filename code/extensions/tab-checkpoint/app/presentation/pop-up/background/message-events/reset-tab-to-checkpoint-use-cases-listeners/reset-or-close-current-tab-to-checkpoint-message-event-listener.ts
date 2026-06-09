import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { ResetTabToCheckpointUseCases } from "../../../../../use-cases/reset-tab-to-checkpoint-use-cases.ts";

export class ResetOrCloseCurrentTabToCheckpointMessageEventListener implements MessageEventListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "reset-or-close-current-tab-to-checkpoint-message-event-listener";
  description = "Reset or close current tab to checkpoint message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    await this.resetTabToCheckpointUseCases.resetOrCloseCurrentTabToCheckpoint();
    sendResponse({ success: true });
  }
}
