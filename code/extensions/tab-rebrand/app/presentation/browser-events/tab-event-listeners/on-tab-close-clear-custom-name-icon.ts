import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";
import type { ClearTabCustomIconUseCases } from "../../../use-cases/clear-tab-custom-icon-use-cases.ts";
import type { ClearTabCustomNameUseCases } from "../../../use-cases/clear-tab-custom-name-use-cases.ts";

export class OnTabCloseClearCustomNameIcon implements TabEventListener {
  private readonly clearTabCustomIconUseCases: ClearTabCustomIconUseCases;
  private readonly clearTabCustomNameUseCases: ClearTabCustomNameUseCases;

  constructor(
    clearTabCustomIconUseCases: ClearTabCustomIconUseCases,
    clearTabCustomNameUseCases: ClearTabCustomNameUseCases,
  ) {
    this.clearTabCustomIconUseCases = clearTabCustomIconUseCases;
    this.clearTabCustomNameUseCases = clearTabCustomNameUseCases;
  }

  name = "on-tab-close-clear-custom-name-icon";
  description = t("browser_events.on_tab_close_clear_custom_name_icon");
  async command(tabId: string): Promise<void> {
    await Promise.all([
      this.clearTabCustomIconUseCases.clearTabCustomIcon(tabId),
      this.clearTabCustomNameUseCases.clearTabCustomName(tabId),
    ]);
  }
}
