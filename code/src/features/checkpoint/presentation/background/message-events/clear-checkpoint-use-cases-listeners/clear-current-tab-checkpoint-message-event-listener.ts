import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ClearCheckpointUseCases } from "@/features/checkpoint/use-cases/clear-checkpoint-use-cases";

export class ClearCurrentTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "clear-current-tab-checkpoint-message-event-listener";
  description = "Clear current tab checkpoint message event listener";

  async command(): Promise<void> {
    await this.clearCheckpointUseCases.clearCurrentTabCheckpoint();
  }
}