import type { SetTabCustomIconUseCases } from "@/features/tab-rebrand/use-cases/custom-icon/set-tab-custom-icon-use-cases";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";

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
