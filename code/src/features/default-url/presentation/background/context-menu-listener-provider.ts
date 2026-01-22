import type { ContextMenuListener } from "@/app/domain/models/context-menu-listener";
import { ClearCurrentTabDefaultUrl } from "./context-menu-listeners/clear-current-tab-default-url";
import { ResetCurrentTabToDefaultUrl } from "./context-menu-listeners/reset-current-tab-to-default-url";
import { SetCurrentTabDefaultUrl } from "./context-menu-listeners/set-current-tab-default-url";
import type { DefaultUrlUseCases } from "../../domain/default-url-use-cases";
import { DefaultUrlDependencyProvider } from "../../dependency-provider";

export class DefaultUrlContextMenuListenerProvider {
  private useCases: DefaultUrlUseCases;

  constructor(
    useCases: DefaultUrlUseCases = new DefaultUrlDependencyProvider().getDefaultUrlUseCases(),
  ) {
    this.useCases = useCases;
  }

  getContextMenuListeners(): ContextMenuListener[] {
    return [
      new ResetCurrentTabToDefaultUrl(this.useCases),
      new SetCurrentTabDefaultUrl(this.useCases),
      new ClearCurrentTabDefaultUrl(this.useCases),
    ];
  }
}
