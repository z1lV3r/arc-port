import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";

export class ClearTabDefaultUrlMessageEventListener implements MessageEventListener {
  private readonly clearDefaultUrlUseCases: ClearDefaultUrlUseCases;

  constructor(clearDefaultUrlUseCases: ClearDefaultUrlUseCases) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
  }

  name = "clear-tab-default-url-message-event-listener";
  description = "Clear tab default url message event listener";

  async command(tabId: string): Promise<void> {
    await this.clearDefaultUrlUseCases.clearTabDefaultUrl(tabId);
  }
}