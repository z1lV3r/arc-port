import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";

export class ClearCurrentTabDefaultUrlMessageEventListener implements MessageEventListener {
  private readonly clearDefaultUrlUseCases: ClearDefaultUrlUseCases;

  constructor(clearDefaultUrlUseCases: ClearDefaultUrlUseCases) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
  }

  name = "clear-current-tab-default-url-message-event-listener";
  description = "Clear current tab default url message event listener";

  async command(): Promise<void> {
    await this.clearDefaultUrlUseCases.clearCurrentTabDefaultUrl();
  }
}