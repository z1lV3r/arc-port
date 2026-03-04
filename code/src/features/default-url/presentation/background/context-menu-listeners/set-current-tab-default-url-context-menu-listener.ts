import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class SetCurrentTabDefaultUrlContextMenuListener implements ContextMenuListener {
  private readonly setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(setDefaultUrlUseCases: SetDefaultUrlUseCases) {
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }
  name = "context-menu-set-current-tab-default-url";
  description = "Set current tab default URL";
  command = async () => {
    await this.setDefaultUrlUseCases.setCurrentTabDefaultUrl();
  }
}
