import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { SetTabCustomIconUseCases } from "@/features/tab-rebrand/use-cases/custom-icon/set-tab-custom-icon-use-cases";

export class OnTabIconUpdateRestoreCustomIcon implements TabEventListener {
  private readonly setTabCustomIconUseCases: SetTabCustomIconUseCases;

  constructor(setTabCustomIconUseCases: SetTabCustomIconUseCases) {
    this.setTabCustomIconUseCases = setTabCustomIconUseCases;
  }

  name = "on-tab-icon-update-restore-custom-icon";
  description = "Restore custom tab icon when page icon changes";

  async command(tabId: string): Promise<void> {
    await this.setTabCustomIconUseCases.resetTabCustomIcon(tabId);
  }
}
