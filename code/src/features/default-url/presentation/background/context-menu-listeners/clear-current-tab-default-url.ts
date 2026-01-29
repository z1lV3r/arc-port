import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";

export class ClearCurrentTabDefaultUrl implements ContextMenuListener {
  private readonly clearDefaultUrlUseCases: ClearDefaultUrlUseCases;

  constructor(clearDefaultUrlUseCases: ClearDefaultUrlUseCases) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
  }
  name = "context-menu-clear-current-tab-default-url";
  description = "Clear default url";
  featureName = "Default URL";
  command = async () => {
    await this.clearDefaultUrlUseCases.clearCurrentTabDefaultUrl();
  }
}
