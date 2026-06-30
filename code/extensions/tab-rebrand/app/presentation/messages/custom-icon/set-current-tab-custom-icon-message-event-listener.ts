import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { SetTabCustomIconUseCases } from "../../../use-cases/set-tab-custom-icon-use-cases.ts";

export class SetCurrentTabCustomIconMessageEventListener implements MessageEventListener {
  private readonly setTabCustomIconUseCases: SetTabCustomIconUseCases;

  constructor(setTabCustomIconUseCases: SetTabCustomIconUseCases) {
    this.setTabCustomIconUseCases = setTabCustomIconUseCases;
  }

  name = "set-current-tab-custom-icon-message-event-listener";
  description = t('messages.set_current_tab_custom_icon');

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const iconUrl = _request.iconUrl;
    const tabCustomIcon = await this.setTabCustomIconUseCases.setCurrentTabCustomIcon(iconUrl);
    sendResponse({ success: true, data: tabCustomIcon });
  }
}
