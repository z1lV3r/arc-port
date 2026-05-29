import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ClearCheckpointUseCases } from "@/features/checkpoint/use-cases/clear-checkpoint-use-cases";

export class ClearTabCheckpointMessageEventListener implements MessageEventListener {
  private readonly clearCheckpointUseCases: ClearCheckpointUseCases;

  constructor(clearCheckpointUseCases: ClearCheckpointUseCases) {
    this.clearCheckpointUseCases = clearCheckpointUseCases;
  }

  name = "clear-tab-checkpoint-message-event-listener";
  description = "Clear tab checkpoint message event listener";

  async command(tabId: string): Promise<void> {
    await this.clearCheckpointUseCases.clearTabCheckpoint(tabId);
  }
}