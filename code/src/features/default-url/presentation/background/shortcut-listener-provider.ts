import type { ShortcutListener } from "@/app/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrl } from "./shortcut-listeners/set-current-tab-default-url";
import { ClearCurrentTabDefaultUrl } from "./shortcut-listeners/clear-current-tab-default-url";
import { ResetTabToDefaultUrl } from "./shortcut-listeners/reset-current-tab-to-default-url";
import { CloseOrResetCurrentTabToDefaultUrl } from "./shortcut-listeners/close-or-reset-current-tab-to-default-url";
import { DefaultUrlDependencyProvider } from "../../dependency-provider";
import type { DefaultUrlUseCases } from "../../domain/default-url-use-cases";

export class DefaultUrlShortcutListenerProvider {
  private useCases: DefaultUrlUseCases;

  constructor(
    useCases: DefaultUrlUseCases = new DefaultUrlDependencyProvider().getDefaultUrlUseCases(),
  ) {
    this.useCases = useCases;
  }

  getShortcutListeners() {
    const shortcutListeners = new Map<string, ShortcutListener>();

    const setShortCut = new SetCurrentTabDefaultUrl(this.useCases);
    shortcutListeners.set(setShortCut.name, setShortCut);

    const clearShortcut = new ClearCurrentTabDefaultUrl(this.useCases);
    shortcutListeners.set(clearShortcut.name, clearShortcut);

    const resetShortcut = new ResetTabToDefaultUrl(this.useCases);
    shortcutListeners.set(resetShortcut.name, resetShortcut);

    const closeOrResetShortcut = new CloseOrResetCurrentTabToDefaultUrl(
      this.useCases,
    );
    shortcutListeners.set(closeOrResetShortcut.name, closeOrResetShortcut);

    return shortcutListeners;
  }
}
