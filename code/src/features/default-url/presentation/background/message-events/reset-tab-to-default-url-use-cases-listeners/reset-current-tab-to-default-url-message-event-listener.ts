import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";

export class ResetCurrentTabToDefaultUrlMessageEventListener implements MessageEventListener {
  private readonly resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;

  constructor(resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases) {
    this.resetTabToDefaultUrlUseCases = resetTabToDefaultUrlUseCases;
  }

  name = "reset-current-tab-to-default-url-message-event-listener";
  description = "Reset current tab to default url message event listener";

  async command(): Promise<void> {
    await this.resetTabToDefaultUrlUseCases.resetCurrentTabToDefaultUrl();
  }
}
