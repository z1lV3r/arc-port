import type { Shortcut } from "@/app/domain/shortcut";
import { SetCurrentTabDefaultUrl } from "./shortcut-commands/set-current-tab-default-url";
import { ClearCurrentTabDefaultUrl } from "./shortcut-commands/clear-current-tab-default-url";
import { ResetTabToDefaultUrl } from "./shortcut-commands/reset-tab-to-default-url";
import { CloseOrResetCurrentTabToDefaultUrl } from "./shortcut-commands/close-or-reset-current-tab-to-default-url";
import { getDependencies } from "../dependency-provider";
import type { DefaultUrlUseCases } from "../domain/default-url-use-cases";

export function getShortcuts() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases") as DefaultUrlUseCases;

  const shortcuts = new Map<string, Shortcut>();

  const setShortCut = new SetCurrentTabDefaultUrl(useCases);
  shortcuts.set(setShortCut.name, setShortCut);

  const clearShortcut = new ClearCurrentTabDefaultUrl(useCases);
  shortcuts.set(clearShortcut.name, clearShortcut);

  const resetShortcut = new ResetTabToDefaultUrl(useCases);
  shortcuts.set(resetShortcut.name, resetShortcut);

  const closeOrResetShortcut = new CloseOrResetCurrentTabToDefaultUrl(useCases);
  shortcuts.set(closeOrResetShortcut.name, closeOrResetShortcut);

  return shortcuts;
}
