import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";

export class OnTabCloseRemoveDefaultUrl implements TabEventListener {
  private readonly clearDefaultUrlUseCases: ClearDefaultUrlUseCases;

  constructor(clearDefaultUrlUseCases: ClearDefaultUrlUseCases) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
  }

  name = "on-tab-close-remove-default-url";
  description = "Remove default url when tab is closed";
  async command(tabId: string): Promise<void> {
    await this.clearDefaultUrlUseCases.clearTabDefaultUrl(tabId);
  }
}
