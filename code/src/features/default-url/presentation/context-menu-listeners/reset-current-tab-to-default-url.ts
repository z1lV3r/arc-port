import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class ResetCurrentTabToDefaultUrl implements ContextMenuListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "default-url-reset-current-tab-to-default-url";
  description = "Reset current tab to default URL";
  command = async () => {
    await this.defaultUrlUseCases.resetCurrentTabToDefaultUrl();
  }
}
