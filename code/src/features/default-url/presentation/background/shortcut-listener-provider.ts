import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrl } from "./shortcut-listeners/set-current-tab-default-url";
import { ClearCurrentTabDefaultUrl } from "./shortcut-listeners/clear-current-tab-default-url";
import { ResetTabToDefaultUrl } from "./shortcut-listeners/reset-current-tab-to-default-url";
import { ResetOrCloseCurrentTabToDefaultUrl } from "./shortcut-listeners/reset-or-close-current-tab-to-default-url";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class DefaultUrlShortcutListenerProvider {
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

  getShortcutListeners(): ShortcutListener[] {
    return [
      new SetCurrentTabDefaultUrl(this.setDefaultUrlUseCases),
      new ClearCurrentTabDefaultUrl(this.clearDefaultUrlUseCases),
      new ResetTabToDefaultUrl(this.resetTabToDefaultUrlUseCases),
      new ResetOrCloseCurrentTabToDefaultUrl(this.resetTabToDefaultUrlUseCases),
    ];
  }
}
