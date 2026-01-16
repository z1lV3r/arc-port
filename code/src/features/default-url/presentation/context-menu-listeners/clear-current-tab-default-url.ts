import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";
import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";

export class ClearCurrentTabDefaultUrl implements ContextMenuListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "default-url-clear-current-tab-default-url";
  description = "Clear default url";
  command = async () => {
    await this.defaultUrlUseCases.clearCurrentTabDefaultUrl();
  }
}
