import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class SetCurrentTabDefaultUrl implements ContextMenuListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "context-menu-set-current-tab-default-url";
  description = "Set current tab default URL";
  command = async () => {
    await this.defaultUrlUseCases.setCurrentTabDefaultUrl();
  }
}
