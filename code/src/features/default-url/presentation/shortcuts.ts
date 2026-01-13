import type { Shortcut } from "@/app/domain/shortcut";
import { SetCurrentTabDefaultUrl } from "./shortcut-commands/SetCurrentTabDefaultUrl";
import { ClearCurrentTabDefaultUrl } from "./shortcut-commands/ClearCurrentTabDefaultUrl";
import { ResetTabToDefaultUrl } from "./shortcut-commands/ResetTabToDefaultUrl";
import { getDependencies } from "../dependency-provider";

export function getShortcuts() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases");

  const shortcuts = new Map<string, Shortcut>();

  const setShortCut = new SetCurrentTabDefaultUrl(useCases);
  shortcuts.set(setShortCut.name, setShortCut);

  const clearShortcut = new ClearCurrentTabDefaultUrl(useCases);
  shortcuts.set(clearShortcut.name, clearShortcut);

  const resetShortcut = new ResetTabToDefaultUrl(useCases);
  shortcuts.set(resetShortcut.name, resetShortcut);

  return shortcuts;
}
