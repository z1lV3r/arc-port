import type { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import type { ClearTabCustomNameUseCases } from "../../../use-cases/clear-tab-custom-name-use-cases.ts";

export class ClearCurrentTabCustomNameMessageEventListener implements MessageEventListener {
  private readonly clearTabCustomNameUseCases: ClearTabCustomNameUseCases;

  constructor(clearTabCustomNameUseCases: ClearTabCustomNameUseCases) {
    this.clearTabCustomNameUseCases = clearTabCustomNameUseCases;
  }

  name = "clear-current-tab-custom-name-message-event-listener";
  description = t('messages.clear_current_tab_custom_name');

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    await this.clearTabCustomNameUseCases.clearCurrentTabCustomName();
    sendResponse({ success: true });
  }
}
