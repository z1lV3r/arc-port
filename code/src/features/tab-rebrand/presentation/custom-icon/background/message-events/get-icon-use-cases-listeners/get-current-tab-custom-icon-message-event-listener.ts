import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { GetTabCustomIconUseCases } from "@/features/tab-rebrand/use-cases/custom-icon/get-tab-custom-icon-use-cases";

export class GetCurrentTabCustomIconMessageEventListener implements MessageEventListener {
  private readonly getTabCustomIconUseCases: GetTabCustomIconUseCases;

  constructor(getTabCustomIconUseCases: GetTabCustomIconUseCases) {
    this.getTabCustomIconUseCases = getTabCustomIconUseCases;
  }

  name = "get-current-tab-custom-icon-message-event-listener";
  description = "Get current tab custom icon message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const tabCustomIcon = await this.getTabCustomIconUseCases.getCurrentTabCustomIcon();
    sendResponse({ success: true, data: tabCustomIcon });
  }
}