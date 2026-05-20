import type { SetTabCustomNameUseCases } from "@/features/tab-rebrand/use-cases/custom-name/set-tab-custom-name-use-cases";
import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";

export class SetCurrentTabCustomNameMessageEventListener implements MessageEventListener {
  private readonly setTabCustomNameUseCases: SetTabCustomNameUseCases;

  constructor(setTabCustomNameUseCases: SetTabCustomNameUseCases) {
    this.setTabCustomNameUseCases = setTabCustomNameUseCases;
  }

  name = "set-current-tab-custom-name-message-event-listener";
  description = "Set current tab custom name message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const name = _request.name;
    const tabCustomName = await this.setTabCustomNameUseCases.setCurrentTabCustomName(name);
    sendResponse({ success: true, data: tabCustomName });
  }
}
