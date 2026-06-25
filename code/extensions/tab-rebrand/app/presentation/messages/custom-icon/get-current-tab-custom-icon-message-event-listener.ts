import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { GetTabCustomIconUseCases } from "../../../use-cases/get-tab-custom-icon-use-cases.ts";

export class GetCurrentTabCustomIconMessageEventListener implements MessageEventListener {
  private readonly getTabCustomIconUseCases: GetTabCustomIconUseCases;

  constructor(getTabCustomIconUseCases: GetTabCustomIconUseCases) {
    this.getTabCustomIconUseCases = getTabCustomIconUseCases;
  }

  name = "get-current-tab-custom-icon-message-event-listener";
  description = t('messages.get_current_tab_custom_icon');

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const tabCustomIcon = await this.getTabCustomIconUseCases.getCurrentTabCustomIcon();
    sendResponse({ success: true, data: tabCustomIcon });
  }
}
