import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { SetTabCustomIconUseCases } from "../../../use-cases/set-tab-custom-icon-use-cases.ts";

export class SetCurrentTabCustomIconMessageEventListener implements MessageEventListener {
  private readonly setTabCustomIconUseCases: SetTabCustomIconUseCases;

  constructor(setTabCustomIconUseCases: SetTabCustomIconUseCases) {
    this.setTabCustomIconUseCases = setTabCustomIconUseCases;
  }

  name = "set-current-tab-custom-icon-message-event-listener";
  description = "Set current tab custom icon message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const iconUrl = _request.iconUrl;
    const tabCustomIcon = await this.setTabCustomIconUseCases.setCurrentTabCustomIcon(iconUrl);
    sendResponse({ success: true, data: tabCustomIcon });
  }
}
