import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import type { SetTabCustomNameUseCases } from "../../../use-cases/set-tab-custom-name-use-cases.ts";

export class OnTabTitleUpdateRestoreCustomName implements TabEventListener {
  private readonly setTabCustomNameUseCases: SetTabCustomNameUseCases;

  constructor(setTabCustomNameUseCases: SetTabCustomNameUseCases) {
    this.setTabCustomNameUseCases = setTabCustomNameUseCases;
  }

  name = "on-tab-title-update-restore-custom-name";
  description = "Restore custom tab name when page title changes";

  async command(tabId: string): Promise<void> {
    await this.setTabCustomNameUseCases.resetTabCustomName(tabId);
  }
}
