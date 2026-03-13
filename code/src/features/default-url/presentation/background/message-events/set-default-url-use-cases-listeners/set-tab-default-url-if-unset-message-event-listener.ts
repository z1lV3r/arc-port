import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class SetTabDefaultUrlIfUnsetMessageEventListener implements MessageEventListener {
  private readonly setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(setDefaultUrlUseCases: SetDefaultUrlUseCases) {
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }

  name = "set-tab-default-url-if-unset-message-event-listener";
  description = "Set tab default url if unset message event listener";

  async command(request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const defaultUrl = await this.setDefaultUrlUseCases.setTabDefaultUrlIfUnset(request.tabId);
    sendResponse({ success: true, data: defaultUrl });
  }
}
