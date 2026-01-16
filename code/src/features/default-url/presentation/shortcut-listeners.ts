import type { ShortcutListener } from "@/app/domain/models/shortcut-listener";
import { SetCurrentTabDefaultUrl } from "./shortcut-listeners/set-current-tab-default-url";
import { ClearCurrentTabDefaultUrl } from "./shortcut-listeners/clear-current-tab-default-url";
import { ResetTabToDefaultUrl } from "./shortcut-listeners/reset-current-tab-to-default-url";
import { CloseOrResetCurrentTabToDefaultUrl } from "./shortcut-listeners/close-or-reset-current-tab-to-default-url";
import { getDependencies } from "../dependency-provider";
import type { DefaultUrlUseCases } from "../domain/default-url-use-cases";

export function getShortcutListeners() {
  const useCases = getDependencies().get(
    "defaultUrlUseCases",
  ) as DefaultUrlUseCases;

  const shortcutListeners = new Map<string, ShortcutListener>();

  const setShortCut = new SetCurrentTabDefaultUrl(useCases);
  shortcutListeners.set(setShortCut.name, setShortCut);

  const clearShortcut = new ClearCurrentTabDefaultUrl(useCases);
  shortcutListeners.set(clearShortcut.name, clearShortcut);

  const resetShortcut = new ResetTabToDefaultUrl(useCases);
  shortcutListeners.set(resetShortcut.name, resetShortcut);

  const closeOrResetShortcut = new CloseOrResetCurrentTabToDefaultUrl(useCases);
  shortcutListeners.set(closeOrResetShortcut.name, closeOrResetShortcut);

  return shortcutListeners;
}
