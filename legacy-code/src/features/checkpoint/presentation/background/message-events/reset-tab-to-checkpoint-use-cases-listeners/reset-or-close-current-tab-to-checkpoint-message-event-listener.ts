import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ResetTabToCheckpointUseCases } from "@/features/checkpoint/use-cases/reset-tab-to-checkpoint-use-cases";

export class ResetOrCloseCurrentTabToCheckpointMessageEventListener implements MessageEventListener {
  private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

  constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
    this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
  }

  name = "reset-or-close-current-tab-to-checkpoint-message-event-listener";
  description = "Reset or close current tab to checkpoint message event listener";

  async command(): Promise<void> {
    await this.resetTabToCheckpointUseCases.resetOrCloseCurrentTabToCheckpoint();
  }
}
