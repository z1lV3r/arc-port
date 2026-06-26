import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { GetTabCustomNameUseCases } from "../../../use-cases/get-tab-custom-name-use-cases.ts";

export class GetCurrentTabCustomNameMessageEventListener implements MessageEventListener {
  private readonly getTabCustomNameUseCases: GetTabCustomNameUseCases;

  constructor(getTabCustomNameUseCases: GetTabCustomNameUseCases) {
    this.getTabCustomNameUseCases = getTabCustomNameUseCases;
  }

  name = "get-current-tab-custom-name-message-event-listener";
  description = "Get current tab custom name message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const tabCustomName = await this.getTabCustomNameUseCases.getCurrentTabCustomName();
    sendResponse({ success: true, data: tabCustomName });
  }
}
