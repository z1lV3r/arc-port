import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class SetCurrentTabDefaultUrlMessageEventListener implements MessageEventListener {
  private readonly setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(setDefaultUrlUseCases: SetDefaultUrlUseCases) {
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }

  name = "set-current-tab-default-url-message-event-listener";
  description = "Set current tab default url message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const url = await this.setDefaultUrlUseCases.setCurrentTabDefaultUrl();
    sendResponse({ success: true, data: url });
  }
}
