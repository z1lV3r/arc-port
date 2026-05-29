import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { ClearTabCustomIconUseCases } from "@/features/tab-rebrand/use-cases/custom-icon/clear-tab-custom-icon-use-cases";

export class ClearCurrentTabCustomIconMessageEventListener implements MessageEventListener {
  private readonly clearTabCustomIconUseCases: ClearTabCustomIconUseCases;

  constructor(clearTabCustomIconUseCases: ClearTabCustomIconUseCases) {
    this.clearTabCustomIconUseCases = clearTabCustomIconUseCases;
  }

  name = "clear-current-tab-custom-icon-message-event-listener";
  description = "Clear current tab custom icon message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    await this.clearTabCustomIconUseCases.clearCurrentTabCustomIcon();
    sendResponse({ success: true });
  }
}