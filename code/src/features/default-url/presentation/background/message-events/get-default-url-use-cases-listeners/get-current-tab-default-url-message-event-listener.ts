import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";
import type { GetDefaultUrlUseCases } from "@/features/default-url/use-cases/get-default-url-use-cases";

export class GetCurrentTabDefaultUrlMessageEventListener implements MessageEventListener {
  private readonly getDefaultUrlUseCases: GetDefaultUrlUseCases;

  constructor(getDefaultUrlUseCases: GetDefaultUrlUseCases) {
    this.getDefaultUrlUseCases = getDefaultUrlUseCases;
  }

  name = "get-current-tab-default-url-message-event-listener";
  description = "Get current tab default url message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    const url = await this.getDefaultUrlUseCases.getCurrentTabDefaultUrl();
    sendResponse({ success: true, data: url });
  }
}
