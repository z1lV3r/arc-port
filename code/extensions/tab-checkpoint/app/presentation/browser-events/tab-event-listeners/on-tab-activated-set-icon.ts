import { GetCheckpointUseCases } from "../../../use-cases/get-checkpoint-use-cases";

import { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

export class OnTabActivatedSetIcon implements TabEventListener {
  private readonly browserExtensionActionService: BrowserExtensionActionService;
  private readonly getCheckpointUseCases: GetCheckpointUseCases;

  constructor(
    browserExtensionActionService: BrowserExtensionActionService,
    getCheckpointUseCases: GetCheckpointUseCases,
  ) {
    this.browserExtensionActionService = browserExtensionActionService;
    this.getCheckpointUseCases = getCheckpointUseCases;
  }

  name = "on-tab-activated-set-icon";
  description = t("browser_events.on_tab_activated_set_icon");
  async command(tabId: string): Promise<void> {
    const checkpoint =
      await this.getCheckpointUseCases.getCurrentTabCheckpoint();
    if (checkpoint) {
      this.browserExtensionActionService.setIcon("icon/128.png");
    } else {
      this.browserExtensionActionService.setIcon("icon/bw/128.png");
    }
  }
}
