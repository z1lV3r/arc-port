import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";
import { ClearCurrentTabDefaultUrl } from "./context-menu-listeners/clear-current-tab-default-url";
import { ResetCurrentTabToDefaultUrl } from "./context-menu-listeners/reset-current-tab-to-default-url";
import { SetCurrentTabDefaultUrl } from "./context-menu-listeners/set-current-tab-default-url";
import { getDependencies } from "../dependency-provider";
import type { DefaultUrlUseCases } from "../domain/default-url-use-cases";

export function getContextMenus() {
  const useCases = getDependencies().get(
    "defaultUrlUseCases",
  ) as DefaultUrlUseCases;

  const contextMenus = new Map<string, ContextMenuListener>();

  const resetCurrentTabToDefaultUrl = new ResetCurrentTabToDefaultUrl(useCases);
  contextMenus.set(
    resetCurrentTabToDefaultUrl.name,
    resetCurrentTabToDefaultUrl,
  );

  const setCurrentTabDefaultUrl = new SetCurrentTabDefaultUrl(useCases);
  contextMenus.set(setCurrentTabDefaultUrl.name, setCurrentTabDefaultUrl);

  const clearCurrentTabDefaultUrl = new ClearCurrentTabDefaultUrl(useCases);
  contextMenus.set(clearCurrentTabDefaultUrl.name, clearCurrentTabDefaultUrl);

  return { featureName: "Default Url", contextMenus };
}
