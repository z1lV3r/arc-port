import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrl } from "./shortcut-listeners/set-current-tab-default-url";
import { ClearCurrentTabDefaultUrl } from "./shortcut-listeners/clear-current-tab-default-url";
import { ResetTabToDefaultUrl } from "./shortcut-listeners/reset-current-tab-to-default-url";
import { CloseOrResetCurrentTabToDefaultUrl } from "./shortcut-listeners/close-or-reset-current-tab-to-default-url";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class DefaultUrlShortcutListenerProvider {
  private useCases: DefaultUrlUseCases;

  constructor(
    useCases: DefaultUrlUseCases = new DefaultUrlDependencyProvider().getDefaultUrlUseCases(),
  ) {
    this.useCases = useCases;
  }

  getShortcutListeners(): ShortcutListener[] {
    return [
      new SetCurrentTabDefaultUrl(this.useCases),
      new ClearCurrentTabDefaultUrl(this.useCases),
      new ResetTabToDefaultUrl(this.useCases),
      new CloseOrResetCurrentTabToDefaultUrl(this.useCases),
    ];
  }
}
