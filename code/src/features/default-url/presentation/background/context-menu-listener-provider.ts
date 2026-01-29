import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import { ClearCurrentTabDefaultUrl } from "./context-menu-listeners/clear-current-tab-default-url";
import { ResetCurrentTabToDefaultUrl } from "./context-menu-listeners/reset-current-tab-to-default-url";
import { SetCurrentTabDefaultUrl } from "./context-menu-listeners/set-current-tab-default-url";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class DefaultUrlContextMenuListenerProvider {
  private clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  private resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  private setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(
    clearDefaultUrlUseCases: ClearDefaultUrlUseCases = new DefaultUrlDependencyProvider().getClearDefaultUrlUseCases(),
    resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases = new DefaultUrlDependencyProvider().getResetTabToDefaultUrlUseCases(),
    setDefaultUrlUseCases: SetDefaultUrlUseCases = new DefaultUrlDependencyProvider().getSetDefaultUrlUseCases(),
  ) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
    this.resetTabToDefaultUrlUseCases = resetTabToDefaultUrlUseCases;
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }

  getContextMenuListeners(): ContextMenuListener[] {
    return [
      new ResetCurrentTabToDefaultUrl(this.resetTabToDefaultUrlUseCases),
      new SetCurrentTabDefaultUrl(this.setDefaultUrlUseCases),
      new ClearCurrentTabDefaultUrl(this.clearDefaultUrlUseCases),
    ];
  }
}
