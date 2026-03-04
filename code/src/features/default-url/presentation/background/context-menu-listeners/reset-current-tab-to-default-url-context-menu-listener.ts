import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";

export class ResetCurrentTabToDefaultUrlContextMenuListener implements ContextMenuListener {
  private readonly resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;

  constructor(resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases) {
    this.resetTabToDefaultUrlUseCases = resetTabToDefaultUrlUseCases;
  }
  name = "context-menu-reset-current-tab-to-default-url";
  description = "Reset current tab to default URL";
  command = async () => {
    await this.resetTabToDefaultUrlUseCases.resetCurrentTabToDefaultUrl();
  }
}
