import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";
import { ClearCurrentTabDefaultUrl } from "./context-menu-listeners/clear-current-tab-default-url";
import { ResetCurrentTabToDefaultUrl } from "./context-menu-listeners/reset-current-tab-to-default-url";
import { SetCurrentTabDefaultUrl } from "./context-menu-listeners/set-current-tab-default-url";
import type { DefaultUrlUseCases } from "../../domain/default-url-use-cases";
import { DefaultUrlDependencyProvider } from "../../dependency-provider";
import { FeatureContextMenuListeners } from "@/app/domain/models/feature-menu-listeners";

export class DefaultUrlContextMenuListenerProvider {
  private useCases: DefaultUrlUseCases;

  constructor(
    useCases: DefaultUrlUseCases = new DefaultUrlDependencyProvider().getDefaultUrlUseCases(),
  ) {
    this.useCases = useCases;
  }

  getContextMenuListeners() {
    const contextMenus = new Map<string, ContextMenuListener>();

    const resetCurrentTabToDefaultUrl = new ResetCurrentTabToDefaultUrl(
      this.useCases,
    );
    contextMenus.set(
      resetCurrentTabToDefaultUrl.name,
      resetCurrentTabToDefaultUrl,
    );

    const setCurrentTabDefaultUrl = new SetCurrentTabDefaultUrl(this.useCases);
    contextMenus.set(setCurrentTabDefaultUrl.name, setCurrentTabDefaultUrl);

    const clearCurrentTabDefaultUrl = new ClearCurrentTabDefaultUrl(
      this.useCases,
    );
    contextMenus.set(clearCurrentTabDefaultUrl.name, clearCurrentTabDefaultUrl);

    return new FeatureContextMenuListeners("Default Url", contextMenus);
  }
}
